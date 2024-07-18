import { FC, useState } from "react";
import { ButtonComponent } from "../../../../shared/button/button";
import { DateRangePicker } from "../../../../shared/dateRangePicker/dateRangePicker";
import { getCurrentDate } from "../../../../../utils/getCurrentDate";
import { RootState, StatisticalDataType } from "../../../../../redux/reducers/userStorageReduser/types";
import { useAppSelector } from "../../../../../redux/store/store";
import { BtnInner, Container, Wrapper } from "./styledDateRangeModal";

interface DatePikerModalProps {
    getFilter: (chosenDate: { startDate: string | null, endDate: string | null }, statisticalData: StatisticalDataType | null) => void;
}

export const DateRangeModal: FC<DatePikerModalProps> = ({ getFilter }) => {
    const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);

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
                        func={() => getFilter({ startDate: selectedStartDate, endDate: selectedEndDate }, statisticalData)} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}