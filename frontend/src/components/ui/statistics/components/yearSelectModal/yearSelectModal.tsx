import { FC, useState } from "react";
import { ButtonComponent } from "../../../../shared/button/button";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { YearPicker } from "../../../../shared/yearPicker/yearPicker";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { RootState, StatisticalDataType } from "../../../../../redux/reducers/userStorageReduser/types";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { FiltersModalContainer } from "../../../../shared/filtersModalContainer/filtersModalContainer";
import { BtnInner } from "./styledYearSelectModal";

interface YearSelectModalProps {
    getFilter: (
        chosenDate: string | null,
        statisticalData: StatisticalDataType | null,
        setIsAlertActive: (value: AlertComponentProps | null) => void,
        chosenFilterType: string | null,
        dispatch: AppDispatch,
        setIsYearSelectModal: (value: boolean) => void) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    chosenFilterType: string | null;
    setIsYearSelectModal: (value: boolean) => void;
}

export const YearSelectModal: FC<YearSelectModalProps> = ({
    getFilter, setIsAlertActive, chosenFilterType, setIsYearSelectModal }) => {
    const [chosenYear, setChosenYear] = useState<string | null>(null);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    return (
        <FiltersModalContainer>
            <BtnClose
                btnInnerstyles={{
                    marginLeft: "auto",
                    paddingBottom: "10px",
                }}
                closeBlock={setIsYearSelectModal}
                size="lg"
                color="#000" />
            <YearPicker setChosenYear={setChosenYear} />
            <BtnInner>
                <ButtonComponent
                    backgroundColor="#5B8A72"
                    BackgroundColorHover="#0f4a34"
                    text="Apply"
                    color="#fff"
                    type="button"
                    func={() =>
                        getFilter(
                            chosenYear,
                            statisticalData,
                            setIsAlertActive,
                            chosenFilterType,
                            dispatch,
                            setIsYearSelectModal)} />
            </BtnInner>
        </FiltersModalContainer>
    )
}