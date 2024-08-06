import { FC, useState } from "react";
import { ButtonComponent } from "../../../../shared/button/button";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { YearPicker } from "../../../../shared/yearPicker/yearPicker";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { getFilterStatisticsForYear } from "../../../../../utils/statisticalDataUtils";
import { FiltersModalContainer } from "../../../../shared/filtersModalContainer/filtersModalContainer";
import { BtnInner } from "./styledYearSelectModal";

interface YearSelectModalProps {
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    chosenFilterType: string | null;
    setIsYearSelectModal: (value: boolean) => void;
}

export const YearSelectModal: FC<YearSelectModalProps> = ({
    setIsAlertActive, chosenFilterType, setIsYearSelectModal }) => {
    const [chosenYear, setChosenYear] = useState<string | null>(null);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    return (
        <FiltersModalContainer>
            <BtnClose
                btnInnerstyles={{
                    marginLeft: "auto",
                    paddingBottom: "20px",
                }}
                closeBlock={setIsYearSelectModal}
                size="lg" />
            <YearPicker setChosenYear={setChosenYear} />
            <BtnInner>
                <ButtonComponent
                    text="Apply"
                    color="#fff"
                    type="button"
                    func={() =>
                        getFilterStatisticsForYear(
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