export const getCookie = (name: string): string | null =>
  document.cookie.split('; ')
    .map(cookie => cookie.split('='))
    .find(([key]) => key === name)?.[1] ?? null;