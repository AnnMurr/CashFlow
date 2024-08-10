import { FC, useContext, useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getCurrentDate } from "../../../utils/getCurrentDate";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { Box } from "@mui/material";
import { Dayjs } from "dayjs";

interface YearPickerProps {
    setChosenYear: (value: string) => void;
}

export const YearPicker: FC<YearPickerProps> = ({ setChosenYear }) => {
    const [value, setValue] = useState<Dayjs | null>(null);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const DatePickerStyles = {
        width: "100%",
        
        '& .MuiInputLabel-root.Mui-focused ': {
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

    const DatePickerStylesLayout = (themeContext: ThemeContextType) => ({
        boxShadow: `0px 0px 4px ${themeContext.themeStyles.modalLayoutShadow}`,
        color: themeContext.themeStyles.color,
        backgroundColor: themeContext.themeStyles.datePikerLayout,

        '& .MuiPickersYear-yearButton:hover': {
            backgroundColor: themeContext.themeStyles.pickersDayHover,
        },
    });

    const YearButtonStylesLayout = (themeContext: ThemeContextType) => ({
        '&:focus': {
            backgroundColor: themeContext.themeStyles.pickersDaySelected,
            color: "white",
        },
        '&.Mui-selected': {
            backgroundColor: themeContext.themeStyles.pickersDaySelected,
            color: "white",

            '&:hover': {
                backgroundColor: themeContext.themeStyles.pickersDayHover,
            },
            '&:focus': {
                backgroundColor: themeContext.themeStyles.pickersDaySelected,
            },
        },
    });

    useEffect(() => {
        if (value) {
            const date = getCurrentDate(value?.toDate()).slice(6, -6);
            setChosenYear(date);
        }
    }, [value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <DatePicker sx={DatePickerStyles}
                    slotProps={{
                        layout: {
                            sx: DatePickerStylesLayout(themeContext)
                        },
                        yearButton: {
                            sx: YearButtonStylesLayout(themeContext)
                        },
                    }}
                    onChange={(newValue) => setValue(newValue)}
                    label={'year'}
                    views={['year']} />
            </Box>
        </LocalizationProvider>
    );
}