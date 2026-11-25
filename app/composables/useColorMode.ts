const STORAGE_KEY = 'color-theme-studio-color-mode';

type ColorMode = 'light' | 'dark';

const media = window.matchMedia('(prefers-color-scheme: dark)');
const stored = localStorage.getItem(STORAGE_KEY);
const mode = ref<ColorMode>(
  stored === 'light' || stored === 'dark' ? stored : media.matches ? 'dark' : 'light'
);

watchEffect(() => {
  document.documentElement.classList.toggle('dark', mode.value === 'dark');
});

export function useColorMode() {
  const isDark = computed(() => mode.value === 'dark');

  function toggle() {
    mode.value = isDark.value ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, mode.value);
  }

  return { mode, isDark, toggle };
}
