# Database migration guide

This template deliberately contains no inherited product migrations or production schema.

1. Create a new Supabase project for the new product.
2. Configure the Supabase CLI for that project using `supabase/config.toml` as local-development reference.
3. Create versioned SQL migrations in `supabase/migrations/` for your own tables, indexes, RLS policies and database functions.
4. Test anonymous, authenticated and cross-user access before deploying. Do not reuse production data or service-role keys in local development.
5. Keep migrations forward-only: never rewrite a migration that has been applied to a shared environment.

The template's authentication helpers only require the Supabase Auth configuration and the environment variables documented in `TEMPLATE.md`.
