## JavaScript API - `ColorTheme`

`theme.js` exposes a global `ColorTheme` object.

### `ColorTheme.change(name)`

Switch the active theme. Persisted to `localStorage`; dispatches a `themechange` event on
`document.documentElement`.

```js
ColorTheme.change('sunset-red');
```

### `ColorTheme.getThemes()`

Returns an array of all available themes, each with a `name` and representative `color` (shade 500).

```js
const themes = ColorTheme.getThemes();
// [{ name: 'ocean-blue', color: '#3b82f6' }, ...]
```

### `ColorTheme.getCurrentTheme()`

Returns the name of the currently active theme.

```js
const current = ColorTheme.getCurrentTheme();
// 'ocean-blue'
```

### `themechange` event

Fired on `document.documentElement` whenever the theme changes.

```js
document.documentElement.addEventListener('themechange', e => {
  console.log('Theme:', e.detail.theme);
});
```
