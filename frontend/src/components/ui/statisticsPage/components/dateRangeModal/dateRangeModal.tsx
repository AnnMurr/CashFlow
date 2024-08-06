import { FC, useState } from "react";
import { ButtonComponent } from "../../../../shared/button/button";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { DateRangePicker } from "../../../../shared/dateRangePicker/dateRangePicker";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { getCurrentDate } from "../../../../../utils/getCurrentDate";
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { getFilterStatisticsForRange } from "../../../../../utils/statisticalDataUtils";
import { FiltersModalContainer } from "../../../../shared/filtersModalContainer/filtersModalContainer";
import { BtnInner } from "./styledDateRangeModal";

interface DatePickerModalProps {
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    chosenFilterType: string | null;
    setIsDateRangeModal: (value: boolean) => void
}

export const DateRangeModal: FC<DatePickerModalProps> = ({ setIsAlertActive, chosenFilterType, setIsDateRangeModal }) => {
    const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    const handleDateRangeSelect = (startDate: Date | null, endDate: Date | null) => {
        startDate && setSelectedStartDate(getCurrentDate(startDate).slice(0, -6));
        endDate && setSelectedEndDate(getCurrentDate(endDate).slice(0, -6));
    };

    return (
        <FiltersModalContainer>
            <BtnClose
                btnInnerstyles={{
                    marginLeft: "auto",
                    marginBottom: "20px",
                }}
                closeBlock={setIsDateRangeModal}
                size="lg" />
            <DateRangePicker onSelectDateRange={handleDateRangeSelect} />
            <BtnInner>
                <ButtonComponent
                    text="Apply"
                    color="#fff"
                    type="button"
                    func={() => getFilterStatisticsForRange(
                        { startDate: selectedStartDate, endDate: selectedEndDate },
                        statisticalData,
                        setIsAlertActive,
                        chosenFilterType,
                        dispatch,
                        setIsDateRangeModal)} />
            </BtnInner>
        </FiltersModalContainer>
    )
}