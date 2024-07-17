
import { FC, useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getCurrentDate } from '../../../utils/getCurrentDate';

export const DatePiker: FC<any> = ({ setChosenDate }) => {
    const [value, setValue] = useState<Dayjs | null>(null);

    useEffect(() => {
        if (value) {
            const date = getCurrentDate(value?.toDate()).slice(0, -6);
            setChosenDate(date);
        }
    }, [value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker sx={{
                    "& .MuiOutlinedInput-input": {
                        padding: "10px"
                    }
                }}
                    value={value}
                    onChange={(newValue) => setValue(newValue)} />
            </DemoContainer>
        </LocalizationProvider>
    );
}