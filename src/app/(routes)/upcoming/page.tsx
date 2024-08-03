'use client';

import React from 'react';
import OverdueSection from '@/app/components/OverdueSection';
import Header from '@/app/components/PageHeader';
import WeeklyDatePicker from '@/app/components/WeeklyDatePicker';
import { GET_TASKS_BY_DATE } from '@/app/lib/apolloClient';
import { normalizeAllTasks, getMonthDays } from '@/app/utils/utils';
import { useQuery } from '@apollo/client';
import { Box, Typography, Button } from '@mui/joy';
import TaskGroup from '@/app/components/TaskGroup';
import dayjs from 'dayjs';
import useZustandStore from '@/app/lib/zustand/useZustandStore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { type Task } from '@/app/api/graphql/(generatedTypes)/resolversTypes';
dayjs.extend(isSameOrAfter);

const Upcoming = () => {
  const { setIsAddTaskOpen, setSelectedDate, selectedMonthAndYear } =
    useZustandStore();
  const { data, loading, error } = useQuery(GET_TASKS_BY_DATE, {
    variables: {
      dates: {
        startDate: selectedMonthAndYear?.startOf('month').format('YYYY-MM-DD'),
        endDate: selectedMonthAndYear?.endOf('month').format('YYYY-MM-DD'),
        todayDate: dayjs().format('YYYY-MM-DD'),
      },
    },
  });

  const exractedData = data?.getTasksByDate;
  const { incompletedData, overdueData } = normalizeAllTasks(exractedData);
  const monthDays = getMonthDays(selectedMonthAndYear || dayjs());
  const filteredWeekDays = monthDays.filter((day) =>
    dayjs(day.fullDate).isSameOrAfter(dayjs(), 'day')
  );

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '800px',
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <Header header="Upcoming" hasCount={false} />
      <WeeklyDatePicker />
      <OverdueSection data={overdueData} />
      {!loading &&
        filteredWeekDays.map((day, index) => {
          const filteredData = incompletedData?.filter(
            (filteredData: Task) => filteredData.date === day.fullDate
          );

          return (
            <Box mb={2} key={index} id={`date-${day.fullDate}`}>
              <Typography
                level="body-sm"
                sx={{
                  mb: 2,
                  textAlign: 'left',
                  fontWeight: 900,
                  fontSize: 'md',
                  color: 'black',
                }}
              >{`${day.monthName}, ${day.dayNumber} ‧ ${
                day.optionalLabel ?? day.day
              } `}</Typography>
              <TaskGroup data={filteredData} dividerIndex={0} />
              <Box display="flex" alignItems="flex-start" width="100%">
                <Button
                  variant="plain"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    mt: filteredData?.length > 1 ? 2 : 0,
                  }}
                  onClick={() => {
                    setSelectedDate(dayjs(day.fullDate));
                    setIsAddTaskOpen(true);
                  }}
                >
                  + Add task
                </Button>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default Upcoming;
