import { FC, useEffect, useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { getCurrentDate } from "../../../utils/getCurrentDate";

interface YearPickerProps {
    setChosenYear: (value: string) => void;
}

export const YearPicker: FC<YearPickerProps> = ({ setChosenYear }) => {
    const [value, setValue] = useState<Dayjs | null>(null);

    useEffect(() => {
        if (value) {
            const date = getCurrentDate(value?.toDate()).slice(6, -6);
            setChosenYear(date);
        }
    }, [value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                <DatePicker sx={{
                    '& .MuiOutlinedInput-input': {
                        padding: "10px",
                    },
                    '& label': {
                        top: "-4px",
                    }
                }}
                    onChange={(newValue) => setValue(newValue)}
                    label={'year'}
                    views={['year']} />
            </DemoContainer>
        </LocalizationProvider>
    );
}