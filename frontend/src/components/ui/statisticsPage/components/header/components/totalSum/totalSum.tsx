import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { ItemType, RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { Sum, TotalSumInner, TotalSumTitle } from "./styledTotalSum";

export const TotalSum: FC = () => {
    const [totalSum, setTotalSum] = useState<string | null>(null);
    const { chosenFilter, statisticalData, chosenCategoryStatistic } = useAppSelector((state: RootState) => state.storage);

    const getTotalSum = (items: Array<ItemType>) => {
        if (items) {
            const totalSum: number = items.reduce((acc, value) => acc += value.sum, 0);
            setTotalSum(totalSum.toFixed(2));
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
                <TotalSumTitle>
                    <h5>Total:</h5>
                </TotalSumTitle>
                <Sum>
                    <span>{totalSum}$</span>
                </Sum>
            </TotalSumInner>
            : null
    )
}