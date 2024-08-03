import dayjs from 'dayjs';
import { type Task } from '@/app/api/graphql/(generatedTypes)/resolversTypes';

import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekOfYear);
dayjs.extend(weekday);

export const normalizeAllTasks = (data: Task[]) => {
  const todayData = data?.filter(
    (task: Task) => dayjs(task.date).isSame(dayjs(), 'day') && !task.isCompleted
  );
  const overdueData = data
    ?.filter(
      (task: Task) =>
        dayjs(task.date).isBefore(dayjs(), 'day') && !task.isCompleted
    )
    .sort((a: Task, b: Task) => dayjs(a.date).diff(dayjs(b.date)));

  const incompletedData = data?.filter((task: Task) => !task.isCompleted);

  return { todayData, overdueData, incompletedData };
};

interface WeekDay {
  fullDate: string; // Full date in 'YYYY-MM-DD' format
  day: string; // Day of the week (e.g., 'Sunday')
  dayNumber: number; // Day of the month (e.g., 1, 2, 3, ...)
  month: number; // Month number (0-11) where 0 is January
  monthName: string; // Full month name (e.g., 'January')
  year: number; // Year (e.g., 2024)
  optionalLabel?: string;
}

export const getWeekDays = (date: dayjs.Dayjs): WeekDay[] => {
  // Calculate the start of the week (Sunday by default)
  const startOfWeek = date.startOf('week');
  const today = dayjs();
  const tomorrow = today.add(1, 'day');

  // Create an array of objects with full date details
  const weekDays: WeekDay[] = Array.from({ length: 7 }).map((_, i) => {
    const day = startOfWeek.add(i, 'day');
    const optionalLabel = day.isSame(today, 'day')
      ? 'Today'
      : day.isSame(tomorrow, 'day')
      ? 'Tomorrow'
      : undefined;
    return {
      fullDate: day.format('YYYY-MM-DD'),
      day: day.format('dddd'), // Full day name (e.g., 'Sunday')
      dayNumber: day.date(), // Day of the month
      month: day.month(), // Month number (0-11)
      monthName: day.format('MMMM'), // Full month name (e.g., 'January')
      year: day.year(), // Year
      optionalLabel,
    };
  });

  return weekDays;
};

export const getMonthDays = (date: dayjs.Dayjs): WeekDay[] => {
  // Calculate the start of the week (Sunday by default)
  const startOfMonth = date.startOf('month');
  const daysInMonth = date.daysInMonth();
  const today = dayjs();
  const tomorrow = today.add(1, 'day');

  //Create an array of objects with full date details
  const monthDays: WeekDay[] = Array.from({ length: daysInMonth }).map(
    (_, i) => {
      const day = startOfMonth.add(i, 'day');
      const optionalLabel = day.isSame(today, 'day')
        ? 'Today'
        : day.isSame(tomorrow, 'day')
        ? 'Tomorrow'
        : undefined;
      return {
        fullDate: day.format('YYYY-MM-DD'),
        day: day.format('dddd'), // Full day name (e.g., 'Sunday')
        dayNumber: day.date(), // Day of the month
        month: day.month(), // Month number (0-11)
        monthName: day.format('MMMM'), // Full month name (e.g., 'January')
        year: day.year(), // Year
        optionalLabel,
      };
    }
  );

  return monthDays;
};
