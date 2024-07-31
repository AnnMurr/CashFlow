import { FC, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { ItemType, RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { getFormatCurrency } from "../../../../../../../utils/getFormatCurrency";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Sum, TotalSumInner, TotalSumTitle } from "./styledTotalSum";

export const TotalSum: FC = () => {
    const [totalSum, setTotalSum] = useState<string | null>(null);
    const { chosenFilter, statisticalData, chosenCategoryStatistic, currency } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const getTotalSum = (items: Array<ItemType>) => {
        if (items && currency) {
            const totalSum: number = items.reduce((acc, value) => acc += value.sum, 0);
            setTotalSum(getFormatCurrency(totalSum, currency.code));
        }
    }

    useEffect(() => {
        if (statisticalData?.data) {
            const flattenedData = Object.values(statisticalData.data).flat(Infinity) as ItemType[];

            if (chosenCategoryStatistic) {
                getTotalSum(chosenCategoryStatistic);
            } else {
                getTotalSum(flattenedData);
            }
        } else {
            setTotalSum("0");
        }
    }, [statisticalData, chosenCategoryStatistic]);

    return (
        totalSum ?
            <TotalSumInner isfiltered={chosenFilter ? "true" : "false"}>
                <TotalSumTitle themestyles={themeContext.themeStyles}>
                    <h5>Total:</h5>
                </TotalSumTitle>
                <Sum themestyles={themeContext.themeStyles}>
                    <span>{totalSum}</span>
                </Sum>
            </TotalSumInner>
            : null
    )
}