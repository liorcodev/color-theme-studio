## CSS Variables

Every theme exposes 11 shades as CSS custom properties (`50`-`950`) under the `--color-theme-*`
prefix. Use them anywhere in your CSS:

```css
.card {
  background: var(--color-theme-50);
  color: var(--color-theme-900);
  border: 1px solid var(--color-theme-200);
}

.btn-primary {
  background: var(--color-theme-500);
  color: #fff;
}
.btn-primary:hover {
  background: var(--color-theme-600);
}
```

The active theme class is applied to `<html>` automatically.

### Secondary color

In the **Secondary Color** panel choose **Auto** (hue rotated from the primary, adjustable) or
**Manual** (pick any color). Themes saved with a secondary also export `--color-theme-secondary-50`
to `--color-theme-secondary-950`, and `ColorTheme.getThemes()` returns a `secondary` color.
[noofpi-ui](https://liorcodev.github.io/noofpi-ui-docs/) reads these variables for its `secondary`
color. **Off** exports no secondary.
