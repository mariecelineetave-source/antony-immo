-- =====================================================================
-- pros.idf.immo — schéma de la base et règles d'accès
--
-- À coller tel quel dans Supabase : projet → SQL Editor → New query → Run.
-- Le script est rejouable : il ne casse rien s'il est exécuté deux fois.
--
-- Réglages attendus à la création du projet Supabase :
--   Enable Data API .................. coché
--   Automatically expose new tables .. DÉCOCHÉ  (rien n'est accessible par défaut)
--   Enable automatic RLS ............. COCHÉ    (aucune table sans son verrou)
-- Le bloc 10 ci-dessous accorde donc explicitement, table par table, le strict
-- nécessaire. Toute table ajoutée plus tard devra recevoir le même traitement.
--
-- Principe directeur : un professionnel ne peut voir que ses propres opportunités.
-- Ce n'est pas l'application qui le garantit, c'est la base elle-même
-- (Row Level Security). Même quelqu'un qui récupérerait la clé publique du
-- site ne pourrait pas lire les opportunités d'un autre.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1. Les états possibles d'une opportunité
-- ---------------------------------------------------------------------
do $$ begin
  create type statut_opportunite as enum (
    -- le parcours normal
    'recue',
    'qualifiee',
    'contact_en_cours',
    'projet_immobilier',
    'vente_realisee',
    'prime_versee',
    -- les fins de parcours sans prime : toujours accompagnées d'un motif
    'deja_partagee',
    'deja_en_portefeuille',
    'hors_zone',
    'sans_suite',
    'vendu_ailleurs'
  );
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------
-- 2. Les professionnels
--    La fiche est rattachée au compte de connexion (auth.users) : pas de
--    mot de passe stocké ici, la connexion se fait par lien envoyé par e-mail.
-- ---------------------------------------------------------------------
create table if not exists pros (
  id          uuid primary key references auth.users(id) on delete cascade,
  prenom      text not null,
  nom         text,
  email       text not null,
  telephone   text,
  enseigne    text,
  metier      text,
  commune     text,
  -- demandé seulement au moment de la première prime, jamais à l'inscription
  iban        text,
  cree_le     timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 3. Les administrateurs (Marie-Céline, puis d'autres conseillers)
-- ---------------------------------------------------------------------
create table if not exists administrateurs (
  id       uuid primary key references auth.users(id) on delete cascade,
  nom      text,
  ajoute_le timestamptz not null default now()
);

create or replace function est_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from administrateurs where id = auth.uid());
$$;

-- ---------------------------------------------------------------------
-- 4. Les opportunités
-- ---------------------------------------------------------------------
create sequence if not exists numero_opportunite;

create table if not exists opportunites (
  id              uuid primary key default gen_random_uuid(),
  reference       text unique not null,
  pro_id      uuid not null references pros(id) on delete restrict,

  -- le bien
  adresse_saisie  text not null,
  ban_id          text,              -- identifiant Base Adresse Nationale
  code_postal     text,
  commune         text,
  departement     text,              -- 75, 77, 78, 91, 92, 93, 94, 95
  batiment        text,
  escalier        text,
  etage           text,
  type_bien       text,
  avancement      text,
  details         text,

  -- l'empreinte du bien : c'est sur elle que se joue toute l'antériorité.
  -- Calculée par la base, jamais saisie à la main.
  cle_bien text generated always as (
    lower(coalesce(nullif(ban_id, ''), adresse_saisie)) || '#' ||
    lower(coalesce(batiment,  '')) || '#' ||
    lower(coalesce(escalier,  '')) || '#' ||
    lower(coalesce(etage,     ''))
  ) stored,

  -- le propriétaire
  proprietaire_nom   text,
  proprietaire_tel   text,
  accord_atteste     boolean not null default false,
  citation_autorisee boolean not null default false,
  numero_transmis    boolean not null default false,  -- le professionnel lui a donné notre numéro

  -- le suivi
  statut          statut_opportunite not null default 'recue',
  motif           text,              -- obligatoire sur les fins sans prime
  partagee_le     timestamptz not null default now(),
  expire_le       timestamptz not null default now() + interval '24 months',
  dernier_contact_le timestamptz,

  constraint accord_obligatoire check (
    proprietaire_tel is null or accord_atteste = true
  )
);

create index if not exists opportunites_cle_bien   on opportunites (cle_bien);
create index if not exists opportunites_pro    on opportunites (pro_id, partagee_le desc);
create index if not exists opportunites_statut     on opportunites (statut, partagee_le desc);

-- Numérotation lisible : OPP-2026-0001
create or replace function attribuer_reference()
returns trigger language plpgsql as $$
begin
  if new.reference is null or new.reference = '' then
    new.reference := 'OPP-' || to_char(now(), 'YYYY') || '-' ||
                     lpad(nextval('numero_opportunite')::text, 4, '0');
  end if;
  return new;
end $$;

drop trigger if exists trg_reference on opportunites;
create trigger trg_reference before insert on opportunites
for each row execute function attribuer_reference();

-- Tout contact effectif avec le propriétaire relance les 24 mois.
create or replace function relancer_validite()
returns trigger language plpgsql as $$
begin
  if new.dernier_contact_le is distinct from old.dernier_contact_le
     and new.dernier_contact_le is not null then
    new.expire_le := new.dernier_contact_le + interval '24 months';
  end if;
  return new;
end $$;

drop trigger if exists trg_validite on opportunites;
create trigger trg_validite before update on opportunites
for each row execute function relancer_validite();

-- ---------------------------------------------------------------------
-- 5. Le journal : ce que le professionnel voit de l'avancement
-- ---------------------------------------------------------------------
create table if not exists evenements (
  id             bigserial primary key,
  opportunite_id uuid not null references opportunites(id) on delete cascade,
  statut         statut_opportunite,
  message        text,              -- rédigé pour le professionnel, il le lit
  cree_le        timestamptz not null default now(),
  cree_par       uuid references auth.users(id)
);
create index if not exists evenements_opportunite on evenements (opportunite_id, cree_le desc);

-- Les notes de travail, que le professionnel ne doit jamais voir.
-- Table séparée plutôt que colonne cachée : impossible de fuiter par erreur.
create table if not exists notes_internes (
  id             bigserial primary key,
  opportunite_id uuid not null references opportunites(id) on delete cascade,
  note           text not null,
  cree_le        timestamptz not null default now(),
  cree_par       uuid references auth.users(id)
);

-- Chaque changement de statut laisse une trace, automatiquement.
create or replace function journaliser_statut()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' or new.statut is distinct from old.statut then
    insert into evenements (opportunite_id, statut, message, cree_par)
    values (new.id, new.statut, new.motif, auth.uid());
  end if;
  return new;
end $$;

drop trigger if exists trg_journal on opportunites;
create trigger trg_journal after insert or update on opportunites
for each row execute function journaliser_statut();

-- ---------------------------------------------------------------------
-- 6. Les primes
-- ---------------------------------------------------------------------
create table if not exists primes (
  id             uuid primary key default gen_random_uuid(),
  opportunite_id uuid not null unique references opportunites(id) on delete restrict,
  pro_id     uuid not null references pros(id) on delete restrict,
  montant_euros  integer not null default 1000,
  statut         text not null default 'a_venir'
                 check (statut in ('a_venir','a_verser','versee')),
  acte_le        date,
  versee_le      date,
  cree_le        timestamptz not null default now()
);
create index if not exists primes_pro on primes (pro_id, cree_le desc);

-- Cumul annuel versé à un professionnel : sert à l'informer avant que la question
-- du statut d'indépendant ne se pose (le programme n'a pas de plafond).
create or replace function cumul_annuel(g uuid, annee integer default extract(year from now())::int)
returns integer language sql stable as $$
  select coalesce(sum(montant_euros), 0)::int
  from primes
  where pro_id = g and statut = 'versee'
    and extract(year from versee_le) = annee;
$$;

-- ---------------------------------------------------------------------
-- 7. L'antériorité et le rapprochement
-- ---------------------------------------------------------------------

-- Qui a partagé ce bien en premier ? Renvoie la date, jamais l'identité.
create or replace function anteriorite(cle text)
returns table (reference text, partagee_le timestamptz)
language sql stable security definer set search_path = public as $$
  select o.reference, o.partagee_le
  from opportunites o
  where o.cle_bien = cle
  order by o.partagee_le asc
  limit 1;
$$;

-- Le filet anti-prime-oubliée : à chaque vente signée, on cherche TOUTES les
-- opportunités portant sur ce bien — y compris expirées, y compris classées
-- sans suite. C'est ce contrôle qui rend la promesse tenable.
create or replace function rapprocher(cle text)
returns table (
  reference    text,
  partagee_le  timestamptz,
  statut       statut_opportunite,
  expiree      boolean,
  pro_id   uuid,
  professionnel      text
)
language sql stable security definer set search_path = public as $$
  select o.reference, o.partagee_le, o.statut,
         (o.expire_le < now()) as expiree,
         g.id, coalesce(g.prenom || ' ' || coalesce(g.nom,''), g.email)
  from opportunites o
  join pros g on g.id = o.pro_id
  where o.cle_bien = cle
  order by o.partagee_le asc;
$$;
revoke execute on function rapprocher(text) from anon, authenticated;

-- Effacement des opportunités restées sans suite au bout de 24 mois,
-- comme annoncé dans les mentions légales. À planifier une fois par jour.
create or replace function purger_expirees()
returns integer language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  delete from opportunites
  where statut in ('sans_suite','hors_zone','deja_partagee','vendu_ailleurs')
    and expire_le < now();
  get diagnostics n = row_count;
  return n;
end $$;

-- ---------------------------------------------------------------------
-- 8. LES RÈGLES D'ACCÈS
--    Rien n'est lisible par défaut. Chaque autorisation est explicite.
-- ---------------------------------------------------------------------
alter table pros        enable row level security;
alter table administrateurs enable row level security;
alter table opportunites    enable row level security;
alter table evenements      enable row level security;
alter table notes_internes  enable row level security;
alter table primes          enable row level security;

-- --- pros : chacun sa fiche ---
drop policy if exists pro_lit_sa_fiche on pros;
create policy pro_lit_sa_fiche on pros
  for select using (id = auth.uid() or est_admin());

drop policy if exists pro_cree_sa_fiche on pros;
create policy pro_cree_sa_fiche on pros
  for insert with check (id = auth.uid());

drop policy if exists pro_modifie_sa_fiche on pros;
create policy pro_modifie_sa_fiche on pros
  for update using (id = auth.uid() or est_admin())
             with check (id = auth.uid() or est_admin());

-- --- administrateurs : personne ne s'ajoute soi-même ---
drop policy if exists admin_lit on administrateurs;
create policy admin_lit on administrateurs
  for select using (est_admin());

-- --- opportunités ---
-- Le professionnel voit les siennes et peut en créer. Il ne peut ni les modifier
-- ni les supprimer : le statut appartient au conseiller, et l'horodatage
-- de partage doit rester incontestable.
drop policy if exists pro_lit_ses_opportunites on opportunites;
create policy pro_lit_ses_opportunites on opportunites
  for select using (pro_id = auth.uid() or est_admin());

drop policy if exists pro_partage on opportunites;
create policy pro_partage on opportunites
  for insert with check (pro_id = auth.uid());

drop policy if exists admin_fait_avancer on opportunites;
create policy admin_fait_avancer on opportunites
  for update using (est_admin()) with check (est_admin());

drop policy if exists admin_supprime on opportunites;
create policy admin_supprime on opportunites
  for delete using (est_admin());

-- --- journal : lisible avec l'opportunité, écrit par le conseiller ---
drop policy if exists lecture_journal on evenements;
create policy lecture_journal on evenements
  for select using (
    est_admin() or exists (
      select 1 from opportunites o
      where o.id = evenements.opportunite_id and o.pro_id = auth.uid()
    )
  );

drop policy if exists ecriture_journal on evenements;
create policy ecriture_journal on evenements
  for insert with check (est_admin());

-- --- notes internes : le conseiller, et personne d'autre ---
drop policy if exists notes_admin_seulement on notes_internes;
create policy notes_admin_seulement on notes_internes
  for all using (est_admin()) with check (est_admin());

-- --- primes ---
drop policy if exists pro_lit_ses_primes on primes;
create policy pro_lit_ses_primes on primes
  for select using (pro_id = auth.uid() or est_admin());

drop policy if exists admin_gere_les_primes on primes;
create policy admin_gere_les_primes on primes
  for all using (est_admin()) with check (est_admin());

-- ---------------------------------------------------------------------
-- 10. LES ACCÈS AU NIVEAU DES TABLES
--
--     « Automatically expose new tables » étant décoché, rien n'est joignable
--     par l'API tant qu'on ne l'a pas accordé ici. Deux verrous successifs :
--     ce bloc dit QUELLES TABLES sont visibles, les règles du bloc 8 disent
--     QUELLES LIGNES le sont.
--
--     Le rôle « anon » (visiteur non connecté) ne reçoit rien du tout : il ne
--     peut que demander un lien de connexion.
-- ---------------------------------------------------------------------
grant usage on schema public to anon, authenticated;

grant select, insert, update on pros     to authenticated;
grant select, insert          on opportunites to authenticated;
grant select                  on evenements   to authenticated;
grant select                  on primes       to authenticated;

-- Le conseiller passe par le même rôle « authenticated » : c'est la fonction
-- est_admin() qui lui ouvre l'écriture, pas un privilège de table.
grant update, delete on opportunites   to authenticated;
grant insert         on evenements     to authenticated;
grant all            on notes_internes to authenticated;
grant all            on primes         to authenticated;
grant select         on administrateurs to authenticated;
grant usage          on sequence evenements_id_seq     to authenticated;
grant usage          on sequence notes_internes_id_seq to authenticated;
grant usage          on sequence numero_opportunite    to authenticated;

grant execute on function est_admin()        to authenticated;
grant execute on function anteriorite(text)  to authenticated;
grant execute on function cumul_annuel(uuid, integer) to authenticated;

-- rapprocher() reste hors de portée : elle révèle l'identité des pros.
-- Elle ne s'appelle que depuis le back-office, via une fonction de bord.
revoke execute on function rapprocher(text) from anon, authenticated;

-- ---------------------------------------------------------------------
-- 11. Après l'exécution
--
--   a) Se connecter une première fois sur le site avec contact@idf.immo,
--      puis se déclarer administratrice :
--
--        insert into administrateurs (id, nom)
--        select id, 'Marie-Céline Etave' from auth.users
--        where email = 'contact@idf.immo';
--
--   b) Vérifier que le verrou tient. Connectée en tant que professionnel de test,
--      cette requête doit renvoyer zéro ligne :
--
--        select * from opportunites where pro_id <> auth.uid();
--
--   c) Planifier l'effacement des opportunités sans suite (extension pg_cron) :
--
--        select cron.schedule('purge', '0 4 * * *', 'select purger_expirees()');
--
--   d) Si une requête renvoie « permission denied for table … », c'est qu'une
--      autorisation manque au bloc 10 — et non que les règles d'accès sont
--      mal écrites. Les deux verrous se diagnostiquent séparément.
-- ---------------------------------------------------------------------
