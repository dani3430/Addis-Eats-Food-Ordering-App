export function formatETB(amount) {
  const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return `${numericAmount.toLocaleString('en-US')} ETB`;
}