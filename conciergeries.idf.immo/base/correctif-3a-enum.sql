-- =====================================================================
-- correctif-3a — la catégorie « conciergerie »
--
-- À exécuter SEUL, avant correctif-3.sql : PostgreSQL refuse qu'une valeur
-- d'énumération serve dans la transaction même qui l'ajoute. Une commande,
-- une transaction, et le correctif-3 peut ensuite s'en servir.
--
-- Dans Supabase : SQL Editor → New query → coller cette seule ligne → Run.
-- =====================================================================

alter type categorie_prescripteur add value if not exists 'conciergerie';
