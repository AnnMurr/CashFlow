import { CURRENCY_TO_LOCALE } from "../consts/index";

export function getFormatCurrency(price: number, currencyCode: string): string {
    const formatter = new Intl.NumberFormat(CURRENCY_TO_LOCALE[currencyCode], {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
    });

    return formatter.format(price);
}