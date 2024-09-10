import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Calendar, Container, Select } from "./styledDateSelector";

interface DateSelectorProps {
    setIsDateRangeModal: (value: boolean) => void;
    dateRange: string;
}

export const DateSelector: FC<DateSelectorProps> = ({ setIsDateRangeModal, dateRange }) => {
    return (
        <Container>
            <Select onClick={() => setIsDateRangeModal(true)}>
                <Calendar>
                    <FontAwesomeIcon icon={faCalendar} />
                </Calendar>
                <span style={{ borderBottom: "1px solid" }}>{dateRange}</span>
            </Select>
        </Container>
    )
}