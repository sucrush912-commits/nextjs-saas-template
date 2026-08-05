# Changelog

## Unreleased

- Extracted a reusable SaaS foundation from the previous product implementation.
- Added a Google OAuth sign-in action, login button and Supabase callback flow.
- Fixed the OAuth callback so Supabase session cookies are returned with the browser redirect and remain available on protected account pages.
- Added MIT licensing and GitHub repository metadata for the public template release.
- Expanded the README into a bilingual guide for cloning, configuring, extending, and safely using the template.
- Hardened checkout defaults and made Vercel Analytics opt-in.
- Removed unused dependencies, upgraded Next.js to the patched 16.3.0 release, and restored TypeScript validation during production builds.
- Removed the unused local OpenAI Studio placeholder.
