import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface DateRangePickerProps {
  onSelectDateRange: (startDate: Date | null, endDate: Date | null) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSelectDateRange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    setStartDate(date);
    onSelectDateRange(date, endDate);
  };

  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    setEndDate(date);
    onSelectDateRange(startDate, date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="start-date-picker"
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            // TextFieldProps={{'aria-label': 'change start date' }}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="end-date-picker"
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            // TextFieldProps={{
            //   'aria-label': 'change end date',
            // }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

