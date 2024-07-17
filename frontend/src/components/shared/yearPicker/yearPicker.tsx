import { FC, useEffect, useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { getCurrentDate } from "../../../utils/getCurrentDate";

export const YearPicker: FC<any> = ({ setChosenYear }) => {
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
                <DatePicker onChange={(newValue) => setValue(newValue)} label={'year'} views={['year']} />
            </DemoContainer>
        </LocalizationProvider>
    );
}