# Next.js SaaS template

## What this is

This is a clean starting point for a SaaS product built with Next.js App Router, TypeScript, Supabase Auth, the Waffo Pancake provider, shadcn/ui and Tailwind CSS. It includes authentication helpers, session refresh, a minimal landing page, locale context, SEO metadata, optional GA4 loading and payment-provider primitives. It deliberately contains no product data model, product copy, products, reports or fulfillment rules.

## Quick start

```bash
git clone <your-repository-url>
cd <your-repository>
npm install
cp .env.example .env.local
npm run dev
```

The repository is also configured for pnpm; use `pnpm install` and `pnpm dev` if that is your team's package manager.

## Environment variables

| Variable | Purpose | Where to get it |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL and OAuth/checkout origin fallback | Your deployed domain |
| `NEXT_PUBLIC_POST_LOGIN_REDIRECT` | Internal path after auth events | Choose an internal route, such as `/` |
| `NEXT_PUBLIC_GA_ID` | Optional GA4 Measurement ID | Google Analytics property settings |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase browser publishable key | Supabase project settings |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only administrative key | Supabase project settings; never expose it to the browser |
| `WAFFO_MERCHANT_ID` | Waffo merchant identifier | Waffo merchant dashboard |
| `WAFFO_PRIVATE_KEY` | Server-only Waffo credential | Waffo merchant dashboard; never expose it to the browser |
| `WAFFO_DEFAULT_CURRENCY` | Default Waffo checkout currency | Your Waffo product configuration |
| `WAFFO_PRODUCT_*` | Optional fixed product IDs for your future business layer | Your Waffo product catalogue |
| `LOCATION_*`, `OPEN_METEO_*` | Unused compatibility placeholders from the source project | Only configure after adding a location feature |

## Google OAuth setup

1. In Supabase Dashboard, enable the **Google** provider under **Authentication → Providers** and enter a Google OAuth client ID and secret.
2. In Google Cloud, add the Supabase callback URI shown in the provider setup (normally `https://<project-ref>.supabase.co/auth/v1/callback`) to the OAuth client's authorized redirect URIs.
3. In **Authentication → URL Configuration**, set your site URL and allow each application callback, for example `http://localhost:3000/auth/callback` locally and `https://your-domain.com/auth/callback` in production.

The application sends the user to `/auth/callback`, exchanges the authorization code for a Supabase session, then returns to `/`. No Google credential belongs in a `NEXT_PUBLIC_` variable.

## Replace these placeholders

| Placeholder | Location | Required action |
| --- | --- | --- |
| `{{SITE_NAME}}` | layouts, navigation, footer, legal pages | Set the product name |
| `{{SITE_DESCRIPTION}}` | metadata and landing page | Write the product description |
| `{{LANDING_PAGE_CONTENT}}` | `app/page.tsx` | Build the landing page content |
| `{{NAV_LINKS}}`, `{{FOOTER_LINKS}}` | `components/site-nav.tsx`, `components/site-footer.tsx` | Populate your navigation arrays |
| `{{LEGAL_CONTENT}}` | `components/legal-page.tsx` | Add reviewed, product-specific legal text |
| `{{ACCOUNT_*}}` | account UI components | Add your own account content and deletion implementation |

## Directory map

```text
app/                     App Router pages and API routes
app/auth/                Supabase password and OAuth callback flows
app/actions.ts           Google OAuth server action
app/api/payments/waffo/  Generic checkout and verified-webhook entry points
components/              Shared UI, auth and account shells
lib/supabase/            Browser/server/admin Supabase client factories
lib/payments/            Waffo provider and generic checkout/webhook helpers
lib/i18n.tsx             Locale context and empty message dictionaries
supabase/                Supabase CLI configuration; create your migrations here
public/                  Generic placeholder assets
```

## Add new business safely

1. Create tables, RLS policies and database functions in new versioned migrations under `supabase/migrations/`.
2. Put domain logic in a new `lib/<domain>/` module, not in UI components.
3. Create route handlers under `app/api/<domain>/` to enforce authorization and validate input server-side.
4. Add UI pages/components last, then connect them to those APIs.
5. For Waffo, call `createWaffoCheckout` from your server-side business layer and pass verified events from the webhook route to an idempotent fulfillment handler.
6. Add your public pages to `app/sitemap.ts`, then review metadata, robots rules, mobile behaviour, authentication and RLS before release.
