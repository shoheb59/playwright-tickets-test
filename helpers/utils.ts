export function parsePrice(priceText: string): number {
  return parseFloat(priceText.replace(/[^\d.]/g, ''));
}
