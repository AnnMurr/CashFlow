import { FC, useEffect, useState } from "react";
import { MultipleSelectPlaceholder } from "../../../../shared/select/select";
import { MONTH } from "../../../../../consts";
import { ButtonComponent } from "../../../../shared/button/button";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { getMonth, getYear } from "../../../../../utils/getCurrentDate";
import { getFilterStatisticsForMonth } from "../../../../../utils/statisticalDataUtils";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { FiltersModalContainer } from "../../../../shared/filtersModalContainer/filtersModalContainer";
import { BtnInner } from "./styledMonthSelectModal";

interface MonthSelectModalProps {
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    chosenFilterType: string | null;
    setIsMonthSelectModal: (value: boolean) => void;
}

export const MonthSelectModal: FC<MonthSelectModalProps> = ({
    setIsAlertActive, chosenFilterType, setIsMonthSelectModal }) => {
    const [months, setMonths] = useState<Array<string> | null>(null);
    const [month, setMonth] = useState<string | null>(null);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const currentMonthIndex = getMonth();
        const currentYear = getYear().toString();
        const previousYear = +currentYear - 1;
        const monthsList = [];
      

        for (let i = currentMonthIndex - 1; i >= 0; i--) {
            monthsList.push(`${MONTH[i]} ${currentYear}`);
        }

        for (let i = MONTH.length - 1; i > currentMonthIndex - 1; i--) {
            monthsList.push(`${MONTH[i]} ${previousYear}`);
        }
        
        setMonths(monthsList);
        setMonth(monthsList[0]);
    }, []);

    return (
        <FiltersModalContainer>
            <BtnClose
                btnInnerstyles={{
                    marginLeft: "auto",
                    marginBottom: "20px",
                }}
                closeBlock={setIsMonthSelectModal}
                size="lg" />
            <MultipleSelectPlaceholder
                setCategoryName={setMonth}
                categoryName={month}
                names={months} />
            <BtnInner>
                <ButtonComponent
                    text="Apply"
                    color="#fff"
                    type="button"
                    func={() =>
                        getFilterStatisticsForMonth(
                            month,
                            statisticalData,
                            setIsAlertActive,
                            chosenFilterType,
                            dispatch,
                            setIsMonthSelectModal)} />
            </BtnInner>
        </FiltersModalContainer>
    )
}