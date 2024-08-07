import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar as MuiCalendar } from '@mui/x-date-pickers/DateCalendar';
import Popover from '@mui/material/Popover';
import { Button, Stack } from '@mui/joy';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import { showDate } from './utils';
import useZustandStore from '@/app/lib/zustand/useZustandStore';

const DateButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleCalendarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { selectedDate, setSelectedDate } = useZustandStore();

  const handleCalendarClose = () => {
    setAnchorEl(null);
  };

  const openCalendar = Boolean(anchorEl);

  const popoverId = openCalendar ? 'simple-popover' : undefined;
  return (
    <Stack>
      <Button
        variant="solid"
        startDecorator={<CalendarTodayOutlined />}
        onClick={handleCalendarClick}
        aria-describedby={popoverId}
        color="success"
      >
        {showDate(selectedDate)}
      </Button>
      <Popover
        id={popoverId}
        open={openCalendar}
        onClose={handleCalendarClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MuiCalendar
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
              setAnchorEl(null);
            }}
          />
        </LocalizationProvider>
      </Popover>
    </Stack>
  );
};

export default DateButton;
