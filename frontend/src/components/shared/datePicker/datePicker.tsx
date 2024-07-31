
import { FC, useContext, useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import { ThemeContextType } from '../../../contexts/themeContext/types';
import { ThemeContext } from '../../../contexts/themeContext/themeContext';
import { Box } from '@mui/material';

export const DatePickerComponent: FC<any> = ({ setChosenDate }) => {
    const [value, setValue] = useState<Dayjs | null>(null);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const DatePickerStyles = {
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
        boxShadow: `0px 0px 4px ${themeContext.themeStyles.datePikerLayoutShadow}`,
        color: themeContext.themeStyles.color,
        backgroundColor: themeContext.themeStyles.datePikerLayout,

        '& .MuiTypography-root.MuiDayCalendar-weekDayLabel': {
            color: themeContext.themeStyles.color,
        },
        '& .MuiButtonBase-root.MuiPickersDay-root': {
            color: themeContext.themeStyles.color,
            
            '&:hover': {
                backgroundColor: themeContext.themeStyles.pickersDayHover,
            },
        },
        '& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected': {
            backgroundColor: themeContext.themeStyles.pickersDaySelected,
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
                        }
                    }}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
            </Box>
        </LocalizationProvider>
    );
}