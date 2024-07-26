import { AlertComponentProps } from "../components/shared/alert/alert";
import { getCurrency } from "../api/getCurrencyCodes/getCurrencyCodes";
import { CurrencyCodesType, CurrencyNameAndCode } from "../api/getCurrencyCodes/types";
import { CURRENCY_TO_LOCALE } from "../consts/index";
import { getAlert } from "./getAlert";

export const getCurrencies = async (
    setCurrencies: (value: Array<CurrencyNameAndCode> | null) => void,
    setCurrencyName: (value: string | null) => void,
    setIsAlertActive: (value: AlertComponentProps | null) => void
) => {
    try {
        const countriesInfo: CurrencyCodesType = await getCurrency();

        if (countriesInfo) {
            const currencyNamesAndSymbols = countriesInfo
                .filter((country) => country.currencies && Object.keys(CURRENCY_TO_LOCALE).includes(Object.keys(country.currencies)[0]))
                .map((country) => {
                    const keyValue = Object.keys(country.currencies)[0];

                    return { key: keyValue, value: country.currencies[keyValue] };
                })
                .filter((currency) => currency.value.name && currency.value.symbol)
                .filter((currency, index, arr) => index === arr.findIndex((item) => item.value.name === currency.value.name))
                .map((currency) => { return { name: `${currency.value.name} (${currency.value.symbol})`, code: currency.key } })
                .sort((a, b) => a.name.localeCompare(b.name));

            setCurrencies(currencyNamesAndSymbols);
            setCurrencyName(currencyNamesAndSymbols[0].name);
        } else {
            getAlert({ type: "error", text: "Failed getting currencies" }, setIsAlertActive, 3000);
        }
    } catch (err) {
        console.error(err);
    }
}