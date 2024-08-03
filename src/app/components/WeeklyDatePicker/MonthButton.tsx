import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MonthCalendar as MuiCalendar } from '@mui/x-date-pickers/MonthCalendar';
import Popover from '@mui/material/Popover';
import { Button, Stack } from '@mui/joy';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';

import useZustandStore from '@/app/lib/zustand/useZustandStore';
import dayjs from 'dayjs';
import { useLazyQuery } from '@apollo/client';
import { GET_TASKS_BY_DATE } from '@/app/lib/apolloClient';

interface MonthButtonProps {
  setSelectedWeek: (value: dayjs.Dayjs) => void;
}

const MonthButton = ({ setSelectedWeek }: MonthButtonProps) => {
  const [getTasksByDate] = useLazyQuery(GET_TASKS_BY_DATE);
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
            onChange={async (newValue) => {
              await getTasksByDate({
                variables: {
                  dates: {
                    startDate: newValue.startOf('month').format('YYYY-MM-DD'),
                    endDate: newValue.endOf('month').format('YYYY-MM-DD'),
                    todayDate: dayjs().format('YYYY-MM-DD'),
                  },
                },
              });
              setSelectedWeek(newValue.startOf('week'));
              setSelectedMonthAndYear(newValue.startOf('month'));
              setAnchorEl(null);
            }}
          />
        </LocalizationProvider>
      </Popover>
    </Stack>
  );
};

export default MonthButton;
