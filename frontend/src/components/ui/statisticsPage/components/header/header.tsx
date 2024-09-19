import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { setChosenCategoryStatistic, setChosenFilter, setIsEditingData } from "../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { getDataForStatistic } from "../../../../../utils/statisticalDataUtils";
import { BtnGoBack, DeleteBtn, SelectLabels, TotalSum, VariantButtonGroup } from ".";
import { Wrapper } from "./styledHeader";

interface HeaderProps {
    openDatePickerModal: (value: boolean) => void,
    openMonthSelectModal: (value: boolean) => void,
    openYearSelectModal: (value: boolean) => void,
    openDateRangeModal: (value: boolean) => void,
    setChosenFilterType: (value: string | null) => void,
    setIsDeleteFinancesModal: (value: boolean) => void;
    setStatisticType: (value: "expenses" | "income") => void;
    statisticType: "expenses" | "income";
}

export const Header: FC<HeaderProps> = ({
    openDatePickerModal,
    setChosenFilterType,
    openMonthSelectModal,
    openYearSelectModal,
    openDateRangeModal,
    setStatisticType,
    setIsDeleteFinancesModal,
    statisticType }) => {
    const { chosenFilter, chosenCategoryStatistic } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    const handleGoBack = () => {
        if (chosenCategoryStatistic) {
            dispatch(setChosenCategoryStatistic(null));
        } else if (chosenFilter) {
            dispatch(setChosenFilter(null));
            getDataForStatistic(statisticType, dispatch);
            dispatch(setIsEditingData(true));
        }
    }

    return (
        <div>
            <Wrapper isfiltered={chosenFilter ? "true" : "false"}>
                {chosenFilter ?
                    <BtnGoBack goBack={handleGoBack} /> :
                    <>
                        <VariantButtonGroup
                            statisticType={statisticType}
                            setStatisticType={setStatisticType} />
                        <SelectLabels
                            setChosenFilterType={setChosenFilterType}
                            openDatePickerModal={openDatePickerModal}
                            openMonthSelectModal={openMonthSelectModal}
                            openDateRangeModal={openDateRangeModal}
                            openYearSelectModal={openYearSelectModal} />
                        <DeleteBtn setIsDeleteFinancesModal={setIsDeleteFinancesModal} />
                    </>}
                <TotalSum />
            </Wrapper>
        </div>
    )
}
