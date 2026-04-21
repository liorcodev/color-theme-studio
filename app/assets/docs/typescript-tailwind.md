## TypeScript Declarations

The downloaded ZIP includes `theme.d.ts`. Reference it for full autocomplete and type safety:

```ts
/// <reference path="./theme.d.ts" />

// ✅ Autocomplete for theme names
ColorTheme.change('ocean-blue');

// ✅ Typed event handler
document.documentElement.addEventListener('themechange', (e: ThemeChangeEvent) => {
  console.log(e.detail.theme); // typed as ThemeName
});
```

## Tailwind CSS v4

Register the CSS variables as Tailwind theme tokens in your CSS file:

```css
@import 'tailwindcss';

@theme {
  --color-theme-50: var(--color-theme-50);
  --color-theme-100: var(--color-theme-100);
  --color-theme-500: var(--color-theme-500);
  --color-theme-900: var(--color-theme-900);
  /* add all shades as needed */
}
```

Then use Tailwind utilities like `bg-theme-500`, `text-theme-900`, etc.
