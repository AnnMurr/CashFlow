import { FC } from "react";
import { FilterBtn } from "./styledFilter";

interface FilterProps {
    diapason: string | null;
    displayDate: string | null;
    openDatePickerModal: (value: boolean) => void,
    openMonthSelectModal: (value: boolean) => void,
    openYearSelectModal: (value: boolean) => void,
    openDateRangeModal: (value: boolean) => void,

}

export const Filter: FC<FilterProps> = ({
    diapason, displayDate, openDatePickerModal, openMonthSelectModal, openYearSelectModal, openDateRangeModal }) => {

    const openModal = () => {
        switch (diapason) {
            case 'day':
                openDatePickerModal(true);
                break;
            case 'month':
                openMonthSelectModal(true);
                break;
            case 'year':
                openYearSelectModal(true);
                break;
            case 'week':
                openDateRangeModal(true);
                break;
        }
    }

    return (
        <>
            <FilterBtn onClick={openModal}>
                {displayDate}
            </FilterBtn>
        </>
    )
}