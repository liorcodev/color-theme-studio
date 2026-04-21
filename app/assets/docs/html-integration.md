## Basic HTML Integration

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="theme.css" />
    <script src="theme.js"></script>
  </head>
  <body>
    <div style="background: var(--color-theme-500);">Hello World</div>

    <button onclick="ColorTheme.change('ocean-blue')">Ocean Blue</button>
    <button onclick="ColorTheme.change('sunset-red')">Sunset Red</button>
  </body>
</html>
```
