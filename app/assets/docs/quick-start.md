## Quick Start

1. Open the **Builder** tab and pick a base color.
2. Give your theme a name (e.g. `ocean-blue`) and click **Add**.
3. Repeat for as many themes as you need.
4. Choose your **Export Options**:
   - ✅ **Include Tailwind CSS v4** - Adds `@import "tailwindcss"` and wraps default theme in
     `@theme` block
   - ✅ **Include Nuxt UI integration** - Adds `:root { --ui-primary: var(--color-theme-500); }`
5. Click **Download ZIP** - you get `theme.css`, `theme.js`, and `theme.d.ts`.
6. Drop the files into your project and include them in your HTML.

---

## Generated Files

When you click **Download ZIP**, you get three ready-to-use files:

| File         | Purpose                                                          |
| ------------ | ---------------------------------------------------------------- |
| `theme.css`  | CSS custom properties (`--color-theme-50` → `--color-theme-950`) |
| `theme.js`   | `ColorTheme` runtime API with localStorage and event support     |
| `theme.d.ts` | TypeScript declarations for full type safety                     |
