import { FC, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { Calendar, Container, Select } from "./styledDateSelector";

interface DateSelectorProps {
    setIsDateRangeModal: (value: boolean) => void;
    dateRange: string;
}

export const DateSelector: FC<DateSelectorProps> = ({ setIsDateRangeModal, dateRange }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container>
            <Select themestyles={themeContext.themeStyles}>
                <Calendar>
                    <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faCalendar} />
                </Calendar>
                <button type="button" onClick={() => setIsDateRangeModal(true)}>
                    {dateRange}
                </button>
            </Select>
        </Container>
    )
}