export function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function toggleThemeValue(theme) {
  return theme === 'dark' ? 'light' : 'dark';
}
