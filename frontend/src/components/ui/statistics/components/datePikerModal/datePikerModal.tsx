import { FC, useState } from "react";
import { DatePiker } from "../../../../shared/datePicker/datePicker";
import { ButtonComponent } from "../../../../shared/button/button";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { RootState, StatisticalDataType } from "../../../../../redux/reducers/userStorageReduser/types";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { FiltersModalContainer } from "../../../../shared/filtersModalContainer/filtersModalContainer";
import { BtnInner } from "./styledDatePikerModal";
interface DatePikerModalProps {
    getFilter: (
        chosenDate: string | null,
        statisticalData: StatisticalDataType | null,
        setIsAlertActive: (value: AlertComponentProps | null) => void,
        chosenFilterType: string | null,
        dispatch: AppDispatch,
        setIsDatePikerModal: (value: boolean) => void,) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    setIsDatePikerModal: (value: boolean) => void;
    chosenFilterType: string | null;
}

export const DatePikerModal: FC<DatePikerModalProps> = ({
    getFilter, setIsAlertActive, chosenFilterType, setIsDatePikerModal }) => {
    const [chosenDate, setChosenDate] = useState(null);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    return (
        <FiltersModalContainer>
            <DatePiker setChosenDate={setChosenDate} />
            <BtnInner>
                <ButtonComponent
                    backgroundColor="#5B8A72"
                    BackgroundColorHover="#0f4a34"
                    text="Apply"
                    color="#fff"
                    type="button"
                    func={() =>
                        getFilter(
                            chosenDate,
                            statisticalData,
                            setIsAlertActive,
                            chosenFilterType,
                            dispatch,
                            setIsDatePikerModal)} />
            </BtnInner>
        </FiltersModalContainer>
    )
}