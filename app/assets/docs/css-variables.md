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
