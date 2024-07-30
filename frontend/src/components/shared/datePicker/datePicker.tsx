
import { FC, useContext, useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import { ThemeContextType } from '../../../contexts/themeContext/types';
import { ThemeContext } from '../../../contexts/themeContext/themeContext';

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

    useEffect(() => {
        if (value) {
            const date = getCurrentDate(value?.toDate()).slice(0, -6);
            setChosenDate(date);
        }
    }, [value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker sx={DatePickerStyles}
                    value={value}
                    onChange={(newValue) => setValue(newValue)} />
            </DemoContainer>
        </LocalizationProvider>
    );
}