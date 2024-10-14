import { getCurrentMonthAndYear, getWeek, getYear, parseEuropeanDate } from "../utils/dateUtils";

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_PATTERN = /^(?=\S*?[0-9])(?=\S*?[?!@#$%^&*])(?=\S*?[a-z-а-я])(?=\S*?[A-Zа-яА-Я])\S+$/;
export const VALID_SUM_REGEX = /^(?!0$)\d+(\.\d{1,2})?$/;
export const OPERATOR_REGEX = /[+\-/*]/;
export const ONLY_SPACES_REGEX = /^\s+$/;
export const CURRENCY_SYMBOL_REGEX = /\(([^)]+)\)$/;

export const BUTTONS_VALUE = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '.', '0', '=', '/', 'Backspace', 'Enter'];
export const STATISTICS_OPTIONS = ["Day", "Week", "Month", "Year", "Range"];
export const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const CHART_TIME_PERIODS = ['day', 'week', 'month', 'year'];
export const INITIAL_CHARTS_COLORS = ['rgba(26, 171, 46, 1)', 'rgba(36, 215, 174, 1)', 'rgba(95, 183, 212, 1)', 'rgba(0, 126, 215, 1)', 'rgba(142, 108, 239, 1)', 'rgba(255, 0, 0, 1)', 'rgba(255, 115, 0, 1)', 'rgba(83, 215, 38, 1)', 'rgba(255, 236, 1, 1)'];
export const CURRENT_DATES = {
    dateDay: [new Date()],
    datesWeek: getWeek().map(parseEuropeanDate),
    currentYear: getYear(),
    currentMonth: getCurrentMonthAndYear(),
}

export const CURRENCY_TO_LOCALE: Record<string, string> = {
    'AED': 'ar-AE',
    'AFN': 'fa-AF',
    'ALL': 'sq-AL',
    'AMD': 'hy-AM',
    'ANG': 'nl-AW',
    'AOA': 'pt-AO',
    'ARS': 'es-AR',
    'AUD': 'en-AU',
    'AWG': 'nl-AW',
    'AZN': 'az-AZ',
    'BAM': 'bs-BA',
    'BBD': 'en-BB',
    'BDT': 'bn-BD',
    'BGN': 'bg-BG',
    'BHD': 'ar-BH',
    'BIF': 'rn-BI',
    'BMD': 'en-BM',
    'BND': 'en-BN',
    'BOB': 'es-BO',
    'BRL': 'pt-BR',
    'BSD': 'en-BS',
    'BTN': 'en-BT',
    'BWP': 'en-BW',
    'BYN': 'be-BY',
    'BZD': 'en-BZ',
    'CAD': 'en-CA',
    'CDF': 'en-CH',
    'CHF': 'it-CH',
    'CLP': 'es-CL',
    'CNY': 'zh-CN',
    'COP': 'es-CO',
    'CRC': 'es-CR',
    'CUP': 'es-CU',
    'CVE': 'pt-CV',
    'CZK': 'cs-CZ',
    'DJF': 'fr-DJ',
    'DKK': 'da-DK',
    'DOP': 'es-DO',
    'DZD': 'ar-DZ',
    'EGP': 'ar-EG',
    'ERN': 'en-ER',
    'ETB': 'am-ET',
    'EUR': 'fr-FR',
    'FJD': 'en-FJ',
    'FKP': 'en-FK',
    'FOK': 'da-FO',
    'GBP': 'en-GB',
    'GEL': 'ka-GE',
    'GHS': 'ak-GH',
    'GIP': 'en-GI',
    'GMD': 'en-GM',
    'GNF': 'fr-GN',
    'GTQ': 'es-GT',
    'GYD': 'en-GY',
    'HKD': 'zh-HK',
    'HNL': 'es-HN',
    'HRK': 'hr-HR',
    'HTG': 'ht-HT',
    'HUF': 'hu-HU',
    'IDR': 'id-ID',
    'ILS': 'he-IL',
    'INR': 'en-IN',
    'IQD': 'ar-IQ',
    'IRR': 'fa-IR',
    'ISK': 'is-IS',
    'JMD': 'en-JM',
    'JOD': 'ar-JO',
    'JPY': 'ja-JP',
    'KES': 'en-KE',
    'KGS': 'ky-KG',
    'KHR': 'km-KH',
    'KID': 'en-KI',
    'KMF': 'fr-KM',
    'KRW': 'ko-KR',
    'KWD': 'ar-KW',
    'KYD': 'en-KY',
    'KZT': 'kk-KZ',
    'LAK': 'lo-LA',
    'LBP': 'ar-LB',
    'LKR': 'si-LK',
    'LRD': 'en-LR',
    'LSL': 'en-LS',
    'LYD': 'ar-LY',
    'MAD': 'ar-MA',
    'MDL': 'ro-MD',
    'MGA': 'mg-MG',
    'MKD': 'mk-MK',
    'MMK': 'my-MM',
    'MNT': 'mn-MN',
    'MOP': 'pt-MO',
    'MRU': 'ar-MR',
    'MUR': 'en-MU',
    'MVR': 'dv-MV',
    'MWK': 'ny-MW',
    'MXN': 'es-MX',
    'MYR': 'ms-MY',
    'MZN': 'pt-MZ',
    'NAD': 'en-NA',
    'NGN': 'en-NG',
    'NIO': 'es-NI',
    'NOK': 'no-NO',
    'NPR': 'ne-NP',
    'NZD': 'en-NZ',
    'OMR': 'ar-OM',
    'PAB': 'es-PA',
    'PEN': 'es-PE',
    'PGK': 'en-PG',
    'PHP': 'en-PH',
    'PKR': 'ur-PK',
    'PLN': 'pl-PL',
    'PYG': 'es-PY',
    'QAR': 'ar-QA',
    'RON': 'ro-RO',
    'RSD': 'sr-RS',
    'RUB': 'ru-RU',
    'RWF': 'rw-RW',
    'SAR': 'ar-SA',
    'SBD': 'en-SB',
    'SCR': 'en-SC',
    'SDG': 'ar-SD',
    'SEK': 'sv-SE',
    'SGD': 'en-SG',
    'SHP': 'en-SH',
    'SLL': 'en-SL',
    'SOS': 'so-SO',
    'SRD': 'nl-SR',
    'SSP': 'en-SS',
    'STN': 'pt-ST',
    'SYP': 'ar-SY',
    'SZL': 'en-SZ',
    'THB': 'th-TH',
    'TJS': 'tg-TJ',
    'TMT': 'tk-TM',
    'TND': 'ar-TN',
    'TOP': 'en-TO',
    'TRY': 'tr-TR',
    'TTD': 'en-TT',
    'TVD': 'en-TV',
    'TZS': 'sw-TZ',
    'UAH': 'uk-UA',
    'UGX': 'en-UG',
    'USD': 'en-US',
    'UYU': 'es-UY',
    'UZS': 'uz-UZ',
    'VEF': 'es-VE',
    'VND': 'vi-VN',
    'VUV': 'bi-VU',
    'WST': 'en-WS',
    'XAF': 'fr-CM',
    'XCD': 'en-GD',
    'XDR': 'en-GB',
    'XOF': 'fr-BJ',
    'XPF': 'fr-PF',
    'YER': 'ar-YE',
    'ZAR': 'en-ZA',
    'ZMW': 'en-ZM',
    'ZWL': 'en-ZW',
};