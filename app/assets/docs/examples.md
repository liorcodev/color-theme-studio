## Examples

### Dynamic Theme Selector

```js
const container = document.getElementById('theme-selector');

ColorTheme.getThemes().forEach(({ name, color }) => {
  const btn = document.createElement('button');
  btn.textContent = name;
  btn.style.backgroundColor = color;
  btn.style.color = '#fff';
  btn.onclick = () => ColorTheme.change(name);
  container.appendChild(btn);
});
```

### React Integration

```jsx
import { useEffect, useState } from 'react';

function ThemeSwitcher() {
  const [current, setCurrent] = useState(ColorTheme.getCurrentTheme());
  const themes = ColorTheme.getThemes();

  useEffect(() => {
    const handler = e => setCurrent(e.detail.theme);
    document.documentElement.addEventListener('themechange', handler);
    return () => document.documentElement.removeEventListener('themechange', handler);
  }, []);

  return (
    <div>
      <p>Active: {current}</p>
      {themes.map(({ name, color }) => (
        <button
          key={name}
          style={{ backgroundColor: color, color: '#fff' }}
          onClick={() => ColorTheme.change(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
```

### Nuxt UI Integration

To use your generated themes with Nuxt UI components:

```css
@import '@nuxt/ui';

:root {
  --ui-primary: var(--color-theme-500);
}
```

Now all Nuxt UI components will use your theme colors.
