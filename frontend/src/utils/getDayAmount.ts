import { UserStorageDataType } from "../redux/reducers/userStorageReduser/types";
import { areDatesEqual } from "./dateUtils";
import { getFormatCurrency } from "./getFormatCurrency";

type getDayAmountType = (storageData: UserStorageDataType, type: "expenses" | "income", setDayAmout: (value: string) => void, currency: string) => void;

export const getDayAmount: getDayAmountType = (storageData, type, setDayAmout, currency) => {
    const currentDate = new Date();

    const amount: number = storageData.data[type]
        .filter(element => areDatesEqual(element.date, currentDate))
        .reduce((acc, item) => acc += item.sum, 0);
        const amountFormated = getFormatCurrency(amount, currency)
    setDayAmout(amountFormated);
}