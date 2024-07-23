import { FC, useState } from "react";
import { DatePickerComponent } from "../../../../shared/datePicker/datePicker";
import { ButtonComponent } from "../../../../shared/button/button";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { RootState, StatisticalDataType } from "../../../../../redux/reducers/userStorageReduser/types";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { FiltersModalContainer } from "../../../../shared/filtersModalContainer/filtersModalContainer";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { getFilterStatisticsForDay } from "../../../../../utils/statisticalDataUtils";
import { BtnInner } from "./styledDatePickerModal";

interface DatePickerModalProps {
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    setIsDatePickerModal: (value: boolean) => void;
    chosenFilterType: string | null;
}

export const DatePickerModal: FC<DatePickerModalProps> = ({
    setIsAlertActive, chosenFilterType, setIsDatePickerModal }) => {
    const [chosenDate, setChosenDate] = useState(null);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    return (
        <FiltersModalContainer>
            <BtnClose
                btnInnerstyles={{
                    marginLeft: "auto",
                    marginBottom: "10px",
                }}
                closeBlock={setIsDatePickerModal}
                size="lg"
                color="#000" />
            <DatePickerComponent setChosenDate={setChosenDate} />
            <BtnInner>
                <ButtonComponent
                    backgroundColor="#5B8A72"
                    BackgroundColorHover="#0f4a34"
                    text="Apply"
                    color="#fff"
                    type="button"
                    func={() =>
                        getFilterStatisticsForDay(
                            chosenDate,
                            statisticalData,
                            setIsAlertActive,
                            chosenFilterType,
                            dispatch,
                            setIsDatePickerModal)} />
            </BtnInner>
        </FiltersModalContainer>
    )
}