'use client';

import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/joy';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import useZustandStore from '@/app/lib/zustand/useZustandStore';
import MonthButton from './MonthButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

dayjs.extend(isSameOrAfter);

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface WeeklyDatePickerProps {}

const WeeklyDatePicker = ({}: WeeklyDatePickerProps) => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
  const { selectedMonthAndYear, setSelectedMonthAndYear } = useZustandStore();
  const [selectedWeek, setSelectedWeek] = useState(
    selectedMonthAndYear?.startOf('week') || dayjs().startOf('week')
  );
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(
    selectedWeek.isBefore(dayjs(), 'day')
  );

  const onRightClick = () => {
    setLeftButtonDisabled(false);
    setSelectedWeek(selectedWeek.add(1, 'week'));

    setSelectedMonthAndYear(selectedWeek.add(1, 'week'));
  };
  const onLeftClick = () => {
    setSelectedWeek(selectedWeek.subtract(1, 'week'));
    if (selectedWeek.subtract(1, 'week').isBefore(dayjs(), 'day')) {
      setLeftButtonDisabled(true);
    } else {
      setSelectedMonthAndYear(selectedWeek.subtract(1, 'week'));
    }
  };
  const handleDateClick = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    if (date.isSameOrAfter(dayjs(), 'day')) {
      const elementId = `date-${date.format('YYYY-MM-DD')}`;
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  const onTodayClick = () => {
    setSelectedWeek(dayjs().startOf('week'));
    setSelectedDate(dayjs());
    setSelectedMonthAndYear(dayjs());
    setLeftButtonDisabled(true);
  };

  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Stack
        direction={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems={isMobile ? 'center' : 'flex-start'}
        width="100%"
        spacing={1}
      >
        <MonthButton setSelectedWeek={setSelectedWeek} />
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          width={isMobile ? '100%' : 'auto'}
          justifyContent="center"
        >
          <Button onClick={onLeftClick} disabled={leftButtonDisabled}>
            <ArrowBackIcon />
          </Button>
          <Button onClick={onTodayClick}>Today</Button>
          <Button onClick={onRightClick}>
            <ArrowForwardIcon />
          </Button>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        width={isMobile ? '90%' : '100%'}
        justifyContent={isMobile ? 'center' : 'space-between'}
      >
        {daysOfWeek.map((_, index) => {
          const date = selectedWeek.add(index, 'day');
          const isToday = date.isSame(selectedDate, 'day');
          const isPast = date.isBefore(dayjs(), 'day');

          return (
            <Button
              key={index}
              variant="plain"
              disabled={isPast}
              onClick={() => handleDateClick(date)}
              sx={{
                minWidth: 40,
                alignItems: 'center',
                display: 'flex',
                gap: 0.75,
              }}
            >
              {!isMobile && (
                <Typography
                  level="body-sm"
                  sx={{ color: isToday ? '#000' : isPast ? '#ccc' : 'grey' }}
                >
                  {daysOfWeek[index]}
                </Typography>
              )}
              <Typography
                level="body-sm"
                sx={{
                  fontWeight: isToday ? 'bold' : 'normal',
                  backgroundColor: isToday ? 'orange' : undefined,
                  borderRadius: '4px',
                  padding: '2px',
                  color: isToday ? '#000' : isPast ? '#ccc' : 'grey',
                }}
              >
                {date.date()}
              </Typography>
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default WeeklyDatePicker;
