import dayjs from 'dayjs';
import { type Task } from '@/app/api/graphql/(generatedTypes)/resolversTypes';

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

  return { todayData, overdueData };
};
