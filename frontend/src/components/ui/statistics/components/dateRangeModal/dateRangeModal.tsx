import { FC, useState } from "react";
import { ButtonComponent } from "../../../../shared/button/button";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { DateRangePicker } from "../../../../shared/dateRangePicker/dateRangePicker";
import { getCurrentDate } from "../../../../../utils/getCurrentDate";
import { RootState, StatisticalDataType } from "../../../../../redux/reducers/userStorageReduser/types";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { BtnInner, Container, Wrapper } from "./styledDateRangeModal";

interface DatePikerModalProps {
    getFilter: (
        chosenDate: { startDate: string | null, endDate: string | null },
        statisticalData: StatisticalDataType | null,
        setIsAlertActive: (value: AlertComponentProps | null) => void,
        chosenFilterType: string | null,
        dispatch: AppDispatch,
        setIsDateRangeModal: (value: boolean) => void) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    chosenFilterType: string | null;
    setIsDateRangeModal: (value: boolean) => void
}

export const DateRangeModal: FC<DatePikerModalProps> = ({ getFilter, setIsAlertActive, chosenFilterType, setIsDateRangeModal }) => {
    const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    const handleDateRangeSelect = (startDate: Date | null, endDate: Date | null) => {
        startDate && setSelectedStartDate(getCurrentDate(startDate).slice(0, -6));
        endDate && setSelectedEndDate(getCurrentDate(endDate).slice(0, -6));
    };

    return (
        <Container>
            <Wrapper>
                <DateRangePicker onSelectDateRange={handleDateRangeSelect} />
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Apply"
                        color="#fff"
                        type="button"
                        func={() => getFilter(
                            { startDate: selectedStartDate, endDate: selectedEndDate },
                            statisticalData,
                            setIsAlertActive,
                            chosenFilterType,
                            dispatch,
                            setIsDateRangeModal)} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}