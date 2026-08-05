# Next.js SaaS Template

[中文说明](#中文说明) · [English](#english)

## English

### Build your own website from this foundation

Yes. Anyone can clone this repository, configure their own services, replace the placeholder content, and build a new website or SaaS product on top of it. The template is released under the [MIT License](LICENSE), so it may be used, modified, and used commercially, provided that the license notice is retained.

This is a foundation, not a finished product. It gives you the shared infrastructure; your product idea, pages, data model, copy, legal text, and fulfillment rules remain yours to build.

### Included

- Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui
- Supabase email/password authentication and Google OAuth
- Persistent login sessions and a protected `/account` page
- Locale provider framework, SEO metadata, sitemap, robots rules, and optional GA4
- Generic Waffo checkout, signature verification, and webhook entry points
- Account and legal-page shells, responsive navigation, and a minimal landing-page skeleton

### You need to add

- Your product pages, domain logic, database migrations, and Supabase RLS policies
- Your own site name, description, navigation, footer, legal copy, and visual identity
- Your Supabase, Google OAuth, Waffo, analytics, and deployment configuration
- Your own payment fulfillment logic: products, credits, subscriptions, or order delivery

### Quick start

```bash
git clone https://github.com/sucrush912-commits/nextjs-saas-template.git
cd nextjs-saas-template
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. You may use pnpm instead: `pnpm install` and `pnpm dev`.

### Configure before you build

1. Create a new Supabase project for your own website. Do not reuse another product's database or keys.
2. Copy `.env.example` to `.env.local` and fill in your own values. Never commit `.env.local`.
3. Replace all `{{...}}` placeholders, especially `{{SITE_NAME}}`, `{{SITE_DESCRIPTION}}`, navigation links, landing-page content, and legal content.
4. For Google login, enable Google in Supabase Auth, configure Google Cloud's Supabase callback URL, and allow your local and production `/auth/callback` URLs in Supabase.
5. Add your database migrations under `supabase/migrations/`, then implement RLS policies before storing user data.

After Google login, visit `/account` to confirm that the session persists. For the full environment-variable list, OAuth setup, directory map, and extension guide, see [TEMPLATE.md](TEMPLATE.md).

### Safe customization order

1. Replace the placeholders and global theme in `app/globals.css`.
2. Build your data model and RLS policies with versioned migrations.
3. Put product rules in `lib/<your-domain>/` and server-side API routes in `app/api/<your-domain>/`.
4. Build product pages and components last.
5. Before launch, test sign-in, sign-out, protected pages, payment webhooks, mobile layout, and production environment variables.

### Important security notes

- `SUPABASE_SERVICE_ROLE_KEY` and `WAFFO_PRIVATE_KEY` are server-only secrets. Never give them a `NEXT_PUBLIC_` prefix or commit them to Git.
- The Waffo code is provider infrastructure only. Verify every webhook and implement idempotent fulfillment in your own business layer.
- This template contains no database migrations by design. You are responsible for your schema, RLS, privacy policy, and legal compliance.

### License and contributions

This project is licensed under [MIT](LICENSE). Issues and pull requests are welcome. When contributing, do not include real credentials, user data, or product-specific business logic.

---

## 中文说明

### 用这套基建做你自己的网站

可以。任何人都可以复制这个仓库，配置自己的服务、替换占位内容，并在此基础上开发一个全新的网站或 SaaS 产品。本模板使用 [MIT 许可证](LICENSE)，因此允许使用、修改和商用；只需保留许可证声明即可。

它是一套“基建模板”，不是一个已经完成的产品。登录、支付接口、样式、SEO 等通用能力已经搭好；你的产品页面、数据模型、文案、法律文本和交付规则需要由你自己定义。

### 模板已经包含

- Next.js App Router、TypeScript、Tailwind CSS 和 shadcn/ui
- Supabase 邮箱/密码登录，以及 Google 登录
- 可持续保存的登录状态和受保护的 `/account` 账户页
- 多语言 Provider 框架、SEO metadata、sitemap、robots 和可选 GA4
- 通用 Waffo 支付创建、验签和 webhook 入口
- 账户页与法律页骨架、响应式导航和 Landing Page 骨架

### 你需要自己补充

- 你的产品页面、业务逻辑、数据库 migration 和 Supabase RLS 权限策略
- 你自己的站点名称、描述、导航、页脚、法律文本和品牌视觉
- 你自己的 Supabase、Google OAuth、Waffo、统计和部署配置
- 你自己的支付交付逻辑，例如商品、积分、订阅或订单发货

### 快速开始

```bash
git clone https://github.com/sucrush912-commits/nextjs-saas-template.git
cd nextjs-saas-template
npm install
cp .env.example .env.local
npm run dev
```

随后打开 `http://localhost:3000`。也可以使用 pnpm：`pnpm install` 和 `pnpm dev`。

### 开发前必须完成的配置

1. 为你的新网站新建独立的 Supabase 项目；不要复用其他产品的数据库或密钥。
2. 把 `.env.example` 复制为 `.env.local`，填写你自己的配置；绝对不要提交 `.env.local`。
3. 替换所有 `{{...}}` 占位符，尤其是 `{{SITE_NAME}}`、`{{SITE_DESCRIPTION}}`、导航链接、落地页内容和法律文本。
4. 如需 Google 登录：在 Supabase 启用 Google，在 Google Cloud 填写 Supabase 回调地址，并在 Supabase 放行本地和线上 `/auth/callback` 地址。
5. 在 `supabase/migrations/` 新建你自己的 migration，并在存储用户数据前完成 RLS 权限策略。

Google 登录后，请访问 `/account`，确认登录状态可以持续存在。完整的环境变量说明、OAuth 配置、目录结构和扩展方法见 [TEMPLATE.md](TEMPLATE.md)。

### 推荐开发顺序

1. 替换占位内容，并在 `app/globals.css` 调整全局主题。
2. 用版本化 migration 建立数据模型和 RLS。
3. 将业务规则放进 `lib/<你的业务>/`，服务端接口放进 `app/api/<你的业务>/`。
4. 最后再做具体业务页面和组件。
5. 上线前测试登录、退出、受保护页面、支付 webhook、手机端布局和线上环境变量。

### 安全提醒

- `SUPABASE_SERVICE_ROLE_KEY` 和 `WAFFO_PRIVATE_KEY` 只能放在服务端环境变量中；不能加 `NEXT_PUBLIC_` 前缀，也不能提交到 Git。
- Waffo 代码只提供支付基础能力。你仍需在自己的业务层验证每一个 webhook，并实现可重复调用也不会重复发货的交付逻辑。
- 模板故意不附带数据库 migration。你的数据结构、RLS、隐私政策和合规责任需要根据新产品自行完成。

### 许可证与贡献

本项目使用 [MIT 许可证](LICENSE)。欢迎提交 Issue 和 Pull Request；请勿提交真实密钥、用户数据或任何具体产品的业务代码。
