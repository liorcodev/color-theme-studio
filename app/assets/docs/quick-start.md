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

## Managing Saved Themes

### Reordering Themes

- **Drag and drop** any saved theme to reorder them in your list
- The entire theme card is draggable - just click and drag to your preferred position
- Great for organizing themes by priority or project

### Theme Actions

Each saved theme has quick actions:

- **🎨 Apply** - Load the theme color into the color picker for editing
- **⭐ Star** - Set as the default theme (marked with a star icon)
- **🗑️ Remove** - Delete the theme from your collection

### Tips

- **Hover** over truncated theme names to see the full name in a tooltip
- **Export/Import** your entire theme collection as JSON to share or backup
  - Exports include all themes, the default theme, and your export options (Tailwind/Nuxt UI
    settings)
  - Importing restores themes and settings automatically
- The **default theme** (marked with ⭐) is highlighted in exports

---

## Generated Files

When you click **Download ZIP**, you get three ready-to-use files:

| File         | Purpose                                                          |
| ------------ | ---------------------------------------------------------------- |
| `theme.css`  | CSS custom properties (`--color-theme-50` → `--color-theme-950`) |
| `theme.js`   | `ColorTheme` runtime API with localStorage and event support     |
| `theme.d.ts` | TypeScript declarations for full type safety                     |
