import dayjs, { Dayjs } from 'dayjs';

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
