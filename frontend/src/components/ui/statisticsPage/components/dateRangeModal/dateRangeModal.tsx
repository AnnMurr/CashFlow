import { FC } from "react";
import { ButtonComponent } from "../../../../shared/button/button";
import { DateRangePicker } from "../../../../shared/dateRangePicker/dateRangePicker";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { getCurrentDate } from "../../../../../utils/dateUtils";
import { FiltersModalContainer } from "../../../../shared/filtersModalContainer/filtersModalContainer";
import { BtnInner } from "./styledDateRangeModal";

interface DatePickerModalProps {
    setIsDateRangeModal: (value: boolean) => void
    applyDateRange: () => void;
    setSelectedStartDate: (date: string) => void;
    setSelectedEndDate: (date: string) => void;
}

export const DateRangeModal: FC<DatePickerModalProps> = ({
    setIsDateRangeModal, applyDateRange, setSelectedStartDate, setSelectedEndDate }) => {

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
                    func={applyDateRange} />
            </BtnInner>
        </FiltersModalContainer>
    )
}