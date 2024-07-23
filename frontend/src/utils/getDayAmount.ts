import { UserStorageDataType } from "../redux/reducers/userStorageReduser/types";
import { areDatesEqual } from "./getCurrentDate";

type getDayAmountType = (storageData: UserStorageDataType, type: "expenses" | "income", setDayAmout: (value: string) => void) => void;

export const getDayAmount: getDayAmountType = (storageData, type, setDayAmout) => {
    const currentDate = new Date();

    const amount: number = storageData.data[type]
        .filter(element => areDatesEqual(element.date, currentDate))
        .reduce((acc, item) => acc += item.sum, 0);

    setDayAmout(amount.toFixed(2));
}