import dayjs, { Dayjs } from 'dayjs';
import { GET_TASKS, GET_TASKS_BY_DATE } from '@/app/lib/apolloClient';
import { type DocumentNode } from 'graphql';

export const showDate = (date: Dayjs | null) => {
  console.log(dayjs(date).isSame(dayjs(), 'day'));
  if (!date) {
    return 'Today';
  }
  if (dayjs(date).isSame(dayjs(), 'day')) {
    return 'Today';
  } else if (dayjs(date).isSame(dayjs().add(1, 'day'), 'day')) {
    return 'Tomorrow';
  } else if (dayjs(date).isSame(dayjs().add(-1, 'day'), 'day')) {
    return 'Yesterday';
  } else {
    if (dayjs(date).isSame(dayjs(), 'year')) {
      return date.format('MMMM DD');
    } else {
      return date.format('YYYY, MMMM DD');
    }
  }
};

export const extractErrorCode = (log?: string): number | null => {
  const errorCodePattern = /Received status code (\d{3})/;

  if (!log) {
    return null;
  }

  // Execute the regex on the input string
  const match = errorCodePattern.exec(log);

  // If a match is found, return the captured group (the error code)
  if (match && match[1]) {
    return parseInt(match[1]);
  }

  return null;
};

const refetchQueryList: { [key: string]: DocumentNode } = {
  today: GET_TASKS,
  upcoming: GET_TASKS_BY_DATE,
};

export const getRefetchQuery = (pathname: string) => {
  const pathArr = pathname.split('/');
  const path = pathArr[pathArr.length - 1];
  return refetchQueryList[path];
};
