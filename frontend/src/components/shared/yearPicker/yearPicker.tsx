import { FC, useContext, useEffect, useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { getCurrentDate } from "../../../utils/getCurrentDate";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

interface YearPickerProps {
    setChosenYear: (value: string) => void;
}

export const YearPicker: FC<YearPickerProps> = ({ setChosenYear }) => {
    const [value, setValue] = useState<Dayjs | null>(null);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const ContainerStyles = {
        '&.MuiStack-root': {
            paddingTop: "10px",
        },
    };

    const DatePickerStyles = {
        '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused ': {
            color: themeContext.themeStyles.labelFocused,
        },
        '& .MuiInputBase-input': {
            padding: "10px",
            color: themeContext.themeStyles.color,
        },
        '& .MuiSvgIcon-root': {
            color: themeContext.themeStyles.dataPikerIcon,
        },
        '& .MuiInputLabel-root': {
            color: themeContext.themeStyles.color,
            top: "-6px",
        },
        '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: themeContext.themeStyles.inputBorder,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: themeContext.themeStyles.inputBorderHover,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: themeContext.themeStyles.inputBorderFocused,
            },
        },
    };

    useEffect(() => {
        if (value) {
            const date = getCurrentDate(value?.toDate()).slice(6, -6);
            setChosenYear(date);
        }
    }, [value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={ContainerStyles} components={['DatePicker', 'DatePicker', 'DatePicker']}>
                <DatePicker sx={DatePickerStyles}
                    onChange={(newValue) => setValue(newValue)}
                    label={'year'}
                    views={['year']} />
            </DemoContainer>
        </LocalizationProvider>
    );
}