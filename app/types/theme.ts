export type SecondaryMode = 'off' | 'auto' | 'manual';

export interface ThemeEntry {
  name: string;
  shades: Record<string, string>;
  secondary?: Record<string, string>;
}

export interface ThemeInfo {
  name: string;
  color: string;
  secondary?: string;
}
