/** Skip logging in production to keep PII out of host logs. */
export function logIfDev(...args) {
  if (import.meta.env.PROD) return;
  console.log(...args);
}
