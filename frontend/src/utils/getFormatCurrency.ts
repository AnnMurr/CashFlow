export type CurrencyCode = 
  | 'USD'
  | 'EUR'
  | 'JPY'
  | 'GBP'
  | 'AUD'
  | 'CAD'
  | 'CHF'
  | 'CNY'
  | 'SEK'
  | 'NZD'

export function getFormatCurrency(price: number, currencyCode: CurrencyCode): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  });

  return formatter.format(price);
}