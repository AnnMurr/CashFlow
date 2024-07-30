import React, { useContext, useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Theme, ThemeContextType } from '../../../contexts/themeContext/types';
import { ThemeContext } from '../../../contexts/themeContext/themeContext';

interface DateRangePickerProps {
  onSelectDateRange: (startDate: Date | null, endDate: Date | null) => void;
}

const useStyles = makeStyles((theme) => ({
  datePicker: (props: { themeStyles: Theme }) => ({
    '& .MuiInputBase-root': {
      color: props.themeStyles.color,
    },
    '& .MuiInput-underline:before': {
      borderBottom: `1px solid ${props.themeStyles.inputBorder}`,
    },
    '& .MuiInputLabel-root': {
      color: props.themeStyles.color,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `1px solid ${props.themeStyles.inputBorderHover}`,
    },
  }),
}));

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSelectDateRange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { themeStyles } = useContext<ThemeContextType>(ThemeContext);
  const classes = useStyles({ themeStyles });

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
            className={classes.datePicker}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="start-date-picker"
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange} />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            className={classes.datePicker}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="end-date-picker"
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange} />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

