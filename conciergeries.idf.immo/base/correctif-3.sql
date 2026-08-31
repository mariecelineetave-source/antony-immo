-- =====================================================================
-- correctif-3 — conciergeries.idf.immo rejoint la famille
--
-- À coller dans Supabase APRÈS correctif-3a-enum.sql :
--   projet → SQL Editor → New query → Run. Rejouable.
--
-- Le socle avait presque tout prévu. Une conciergerie, c'est une
-- entreprise et une personne qui y exerce une fonction : exactement ce que
-- décrivent les colonnes « organisation » et « role_dans_organisation »
-- créées pour les associations, et que le back-office affiche déjà. On ne
-- crée donc pas de colonnes en double.
--
-- Ce correctif fait quatre choses :
--
--   1. il ouvre le réseau « conciergeries » — le back-office lisant la
--      table des réseaux, le site y apparaît sans qu'une ligne de code
--      change ;
--   2. il ajoute la seule chose qui manquait vraiment : le SIREN, parce
--      qu'ici le partenaire est une société et que la commission est
--      réglée sur facture d'apport d'affaires ;
--   3. il crée la vue « conciergeries », que l'espace partenaire du site
--      interroge sous ce nom, avec les mêmes déclencheurs que les autres
--      réseaux ;
--   4. il enregistre la règle de rémunération propre à ce réseau :
--      10 % des honoraires NETS, sans plafond, sur la vente comme sur
--      l'expertise.
--
-- Aucune fiche existante n'est touchée.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 0. Le socle doit être à jour
-- ---------------------------------------------------------------------
do $$ begin
  if not exists (
    select 1 from pg_enum e join pg_type t on t.oid = e.enumtypid
    where t.typname = 'categorie_prescripteur' and e.enumlabel = 'conciergerie'
  ) then
    raise exception
      'Passer d''abord correctif-3a-enum.sql, seul : la catégorie « conciergerie » n''existe pas encore.';
  end if;
end $$;

-- ---------------------------------------------------------------------
-- 1. Le réseau est ouvert
-- ---------------------------------------------------------------------
insert into reseaux (code, nom, domaine, categorie, actif) values
  ('conciergeries', 'Conciergeries IDF.immo', 'conciergeries.idf.immo', 'conciergerie', true)
on conflict (code) do update
  set nom = excluded.nom, domaine = excluded.domaine,
      categorie = excluded.categorie, actif = true;

-- ---------------------------------------------------------------------
-- 2. Ce qu'une conciergerie a de particulier
--
--    « organisation » porte la raison sociale, « role_dans_organisation »
--    la fonction de la personne : les deux existent déjà et le back-office
--    les affiche. Seul le SIREN manquait — il sert à la facture d'apport
--    d'affaires. Colonne facultative : elle reste vide pour les autres
--    réseaux.
-- ---------------------------------------------------------------------
alter table prescripteurs add column if not exists siren text;

-- ---------------------------------------------------------------------
-- 3. La vue « conciergeries »
--
--    mon-espace.html du site lit une table « conciergeries » et y insère sa
--    fiche au premier passage, exactement comme gardiens.idf.immo lit
--    « gardiens ». Même dispositif, colonnes adaptées.
-- ---------------------------------------------------------------------
create or replace function vue_conciergerie_modification()
returns trigger language plpgsql as $$
begin
  update prescripteurs set
    prenom                 = new.prenom,
    nom                    = new.nom,
    email                  = new.email,
    telephone              = new.telephone,
    organisation           = new.organisation,
    role_dans_organisation = new.role_dans_organisation,
    siren                  = new.siren,
    commune                = new.commune,
    iban                   = new.iban
  where id = old.id;
  return new;
end $$;

create or replace view conciergeries with (security_invoker = true) as
  select id, prenom, nom, email, telephone,
         organisation, role_dans_organisation, siren, commune, iban, cree_le
  from prescripteurs
  where categorie = 'conciergerie';

drop trigger if exists trg_conciergeries_insertion on conciergeries;
create trigger trg_conciergeries_insertion instead of insert on conciergeries
for each row execute function vue_prescripteur_insertion('conciergerie', 'conciergeries');

drop trigger if exists trg_conciergeries_modification on conciergeries;
create trigger trg_conciergeries_modification instead of update on conciergeries
for each row execute function vue_conciergerie_modification();

grant select, insert, update on conciergeries to authenticated;

-- ---------------------------------------------------------------------
-- 4. La rémunération : 10 % des honoraires NETS, sans plafond
--
--    C'est le point qui distingue ce réseau des gardiens, des nounous et
--    des pros, qui touchent un forfait. Ici, comme pour les associations :
--    un pourcentage, assis sur les honoraires NETS hors taxes — ceux que
--    Marie-Céline perçoit réellement, après la TVA et la quote-part du
--    réseau mandant. JAMAIS les honoraires bruts facturés au client :
--    l'écart est d'environ un quart.
--
--    plafond_annuel_euros reste NULL : aucun plafond, arbitré le
--    31 août 2026. Ne pas y écrire de valeur.
--
--    Le « null::integer » de la première ligne n'est pas une coquetterie :
--    les deux règles étant en pourcentage, la colonne « montant » de la
--    liste ne contient que des NULL, et PostgreSQL lui donnerait le type
--    texte, qui se heurterait à la colonne integer de la table. Vérifié :
--    sans ce cast, le script s'arrête sur une erreur.
--
--    Deux règles suffisent : « acte_authentique » couvre la vente comme
--    l'acquisition, « expertise_reglee » couvre le rapport remis et réglé,
--    qui se rémunère sans qu'aucune vente n'ait lieu.
-- ---------------------------------------------------------------------
insert into regles_remuneration
  (reseau_id, libelle, declencheur, mode, montant_euros, taux_pourcent, assiette, plafond_annuel_euros)
select r.id, v.libelle, v.declencheur, v.mode, v.montant, v.taux, v.assiette, null
from (values
  ('conciergeries', 'Vente ou acquisition — 10 % des honoraires nets', 'acte_authentique', 'pourcentage', null::integer, 10.00::numeric(5,2), 'honoraires_nets'),
  ('conciergeries', 'Expertise en valeur vénale réglée — 10 % nets',   'expertise_reglee', 'pourcentage', null, 10.00, 'honoraires_nets')
) as v(reseau, libelle, declencheur, mode, montant, taux, assiette)
join reseaux r on r.code = v.reseau
where not exists (
  select 1 from regles_remuneration x
  where x.reseau_id = r.id and x.libelle = v.libelle
);

-- ---------------------------------------------------------------------
-- 5. Après l'exécution
--
--   a) Le réseau doit apparaître, actif :
--        select code, nom, domaine, actif from reseaux order by nom;
--
--   b) La vue doit répondre (vide au début, c'est normal) :
--        select * from conciergeries;
--
--   c) Les deux règles doivent être là, à 10 %, sans plafond :
--        select g.libelle, g.declencheur, g.taux_pourcent, g.assiette,
--               g.plafond_annuel_euros
--        from regles_remuneration g join reseaux r on r.id = g.reseau_id
--        where r.code = 'conciergeries';
--
--   d) Rien ne doit avoir bougé ailleurs :
--        select categorie, count(*) from prescripteurs group by categorie;
--
--   e) Le back-office app.idf.immo propose désormais « Conciergeries
--      IDF.immo » dans le choix du réseau. Il affiche déjà l'organisation
--      et le rôle. En revanche il n'affiche PAS encore le SIREN : c'est une
--      ligne à ajouter dans le dépôt app-idf-immo, à part.
-- ---------------------------------------------------------------------
