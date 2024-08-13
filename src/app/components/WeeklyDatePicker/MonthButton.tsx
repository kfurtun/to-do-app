import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MonthCalendar as MuiCalendar } from '@mui/x-date-pickers/MonthCalendar';
import Popover from '@mui/material/Popover';
import { Button, Stack } from '@mui/joy';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';

import useZustandStore from '@/app/lib/zustand/useZustandStore';
import dayjs, { type Dayjs } from 'dayjs';

interface MonthButtonProps {
  setSelectedWeek: (value: dayjs.Dayjs) => void;
  setLeftButtonDisabled: (value: boolean) => void;
}

const MonthButton = ({
  setSelectedWeek,
  setLeftButtonDisabled,
}: MonthButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleCalendarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { setSelectedMonthAndYear, selectedMonthAndYear } = useZustandStore();

  const handleCalendarClose = () => {
    setAnchorEl(null);
  };

  const openCalendar = Boolean(anchorEl);
  const popoverId = openCalendar ? 'simple-popover' : undefined;

  const handleCalendarChange = async (newValue: Dayjs) => {
    const startOfMonth = newValue.startOf('month');
    setSelectedWeek(startOfMonth.startOf('week'));
    setSelectedMonthAndYear(startOfMonth);
    setAnchorEl(null);

    if (startOfMonth.isAfter(dayjs(), 'day')) {
      setLeftButtonDisabled(false);
    }
  };

  return (
    <Stack width="fit-content">
      <Button
        variant="solid"
        startDecorator={<CalendarTodayOutlined />}
        onClick={handleCalendarClick}
        aria-describedby={popoverId}
        color="success"
      >
        {selectedMonthAndYear?.format('MMM YYYY')}
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
            value={selectedMonthAndYear}
            onChange={(newValue) => handleCalendarChange(newValue)}
          />
        </LocalizationProvider>
      </Popover>
    </Stack>
  );
};

export default MonthButton;
