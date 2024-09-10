import React, { useContext, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Grid } from '@material-ui/core';
import { ThemeContextType } from '../../../contexts/themeContext/types';
import { ThemeContext } from '../../../contexts/themeContext/themeContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import { Dayjs } from 'dayjs';

interface DateRangePickerProps {
  onSelectDateRange: (startDate: Date | null, endDate: Date | null) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSelectDateRange }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [openStartDateCalendar, setOpenStartDateCalendar] = useState<boolean>(false);
  const [openEndDateCalendar, setOpenEndDateCalendar] = useState<boolean>(false);
  const { themeStyles } = useContext<ThemeContextType>(ThemeContext);
  const themeContext = useContext<ThemeContextType>(ThemeContext);

  const handleStartDateChange = (date: Dayjs | null) => {
    if (date) {
      setStartDate(date);
      onSelectDateRange(date?.toDate(), endDate ? endDate.toDate() : null);
      setOpenStartDateCalendar(false);
    }
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    if (date) {
      setEndDate(date);
      onSelectDateRange(startDate ? startDate.toDate() : null, date?.toDate());
      setOpenEndDateCalendar(false);
    }
  };

  const DataPickerStyles = {
    '& .MuiIconButton-root': {
      display: 'none',
    },
    '& .MuiInputBase-root.MuiOutlinedInput-root': {
      paddingRight: 0,
    },
    '& .MuiInputBase-input.MuiOutlinedInput-input': {
      padding: "15px 5px 10px 10px",
    },
    '& .MuiInputLabel-root': {
      color: themeStyles.color,

      '&.Mui-focused': {
        color: themeStyles.labelFocused,
      },
    },
    '& .MuiOutlinedInput-root': {
      color: themeStyles.color,
      fontSize: "13px",

      '& .MuiOutlinedInput-notchedOutline': {
        border: "none",
        borderBottom: `1px solid ${themeStyles.inputBorder}`,
        borderRadius: 0,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: themeStyles.inputBorderHover,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: themeStyles.inputBorderFocused,
      },
    },
  };

  const CalendarHeaderStyles = (themeContext: ThemeContextType) => ({
    '& .MuiPickersCalendarHeader-switchViewButton': {
      color: themeContext.themeStyles.color,
    },
    '& .MuiPickersArrowSwitcher-button': {
      color: themeContext.themeStyles.color,
    },
  });

  const CalendarDayStyles = (themeContext: ThemeContextType) => ({
    color: themeContext.themeStyles.color,

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

  const DatePickerStylesLayout = (themeContext: ThemeContextType) => ({
    boxShadow: `0px 0px 4px ${themeContext.themeStyles.modalLayoutShadow}`,
    color: themeContext.themeStyles.color,
    backgroundColor: themeContext.themeStyles.datePikerLayout,

    '& .MuiDayCalendar-weekDayLabel': {
      color: themeContext.themeStyles.color,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box onClick={() => {
            if (!openStartDateCalendar)
              setOpenStartDateCalendar(true)
          }} >
            <DatePicker
              closeOnSelect={true}
              open={openStartDateCalendar}
              onClose={() => setOpenStartDateCalendar(false)}
              autoFocus={true}
              sx={DataPickerStyles}
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              slotProps={{
                calendarHeader: {
                  sx: CalendarHeaderStyles(themeContext)
                },
                layout: {
                  sx: DatePickerStylesLayout(themeContext)
                },
                day: {
                  sx: CalendarDayStyles(themeContext)
                }
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box onClick={() => {
            if (!openEndDateCalendar)
              setOpenEndDateCalendar(true)
          }} >
            <DatePicker
              closeOnSelect={true}
              open={openEndDateCalendar}
              onOpen={() => setOpenEndDateCalendar(true)}
              onClose={() => setOpenEndDateCalendar(false)}
              autoFocus={true}
              sx={DataPickerStyles}
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              slotProps={{
                calendarHeader: {
                  sx: CalendarHeaderStyles(themeContext)
                },
                layout: {
                  sx: DatePickerStylesLayout(themeContext)
                },
                day: {
                  sx: CalendarDayStyles(themeContext)
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

