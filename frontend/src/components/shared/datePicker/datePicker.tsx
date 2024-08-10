import { FC, useContext, useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import { ThemeContextType } from '../../../contexts/themeContext/types';
import { ThemeContext } from '../../../contexts/themeContext/themeContext';
import { Box } from '@mui/material';
import { Dayjs } from 'dayjs';

interface DatePickerComponent {
    setChosenDate: (value: string | null) => void;
}

export const DatePickerComponent: FC<DatePickerComponent> = ({ setChosenDate }) => {
    const [value, setValue] = useState<Dayjs | null>(null);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const DatePickerStyles = {
        width: '100%',
        
        "& .MuiOutlinedInput-input": {
            padding: "10px",
            color: themeContext.themeStyles.color,
        },
        "& .MuiSvgIcon-root": {
            color: themeContext.themeStyles.dataPikerIcon,
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

        '& .MuiDayCalendar-weekDayLabel': {
            color: themeContext.themeStyles.color,
        },
        '& .MuiPickersDay-root': {
            color: themeContext.themeStyles.color,
        },
    });

    const CalendarHeaderStyles = (themeContext: ThemeContextType) => ({
        '& .MuiPickersCalendarHeader-switchViewButton': {
            color: themeContext.themeStyles.color,
        },
        '& .MuiPickersArrowSwitcher-button': {
            color: themeContext.themeStyles.color,
        },
    });

    const CalendarDayStyles = (themeContext: ThemeContextType) => ({
        '&.MuiPickersDay-root': {
            '&:focus': {
                backgroundColor: "transparent",
            },
            '&:not(.Mui-selected)': {
                borderColor: themeContext.themeStyles.color,
            },
        },
        '&.Mui-selected': {
            backgroundColor: themeContext.themeStyles.pickersDaySelected,

            '&:focus': {
                backgroundColor: themeContext.themeStyles.pickersDaySelected,
            },
            '&:hover': {
                backgroundColor: themeContext.themeStyles.pickersDayHover,
            },
        },
        '&:hover': {
            backgroundColor: themeContext.themeStyles.pickersDayHover,
        },
    });

    useEffect(() => {
        if (value) {
            const date = getCurrentDate(value?.toDate()).slice(0, -6);
            setChosenDate(date);
        }
    }, [value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <DatePicker
                    sx={DatePickerStyles}
                    slotProps={{
                        layout: {
                            sx: DatePickerStylesLayout(themeContext)
                        },
                        calendarHeader: {
                            sx: CalendarHeaderStyles(themeContext)
                        },
                        day: {
                            sx: CalendarDayStyles(themeContext)
                        },
                    }}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
            </Box>
        </LocalizationProvider>
    );
}