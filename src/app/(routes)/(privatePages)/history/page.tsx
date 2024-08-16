'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/joy';
import Header from '@/app/components/PageHeader/PageHeader';
import { GET_COMPLETED_TASKS } from '@/app/lib/apolloClient';
import { useQuery } from '@apollo/client';
import { Task } from '@/app/api/graphql/(generatedTypes)/resolversTypes';
import dayjs from 'dayjs';
import { TaskItem } from '@/app/components/TaskGroup';
import useZustandStore from '@/app/lib/zustand/useZustandStore';

const HistoryPage = () => {
  const { hasTaskCompleted, setHasTaskCompleted } = useZustandStore();
  const { data, loading, error, refetch } = useQuery(GET_COMPLETED_TASKS, {
    variables: { loadMoreVars: { skip: 0, limit: 10 } },
    fetchPolicy: hasTaskCompleted ? 'no-cache' : 'cache-and-network',
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [skip, setSkip] = useState(0);
  const normalizedData = data?.getCompletedTasks;
  const disabledShowMoreButton = normalizedData?.totalCount === tasks?.length;

  useEffect(() => {
    setHasTaskCompleted(false);
    if (!loading) {
      setDates(data?.getCompletedTasks.dates);
      setTasks(data?.getCompletedTasks.tasks);
    }
  }, [loading]);

  const handleShowMore = async () => {
    const res = await refetch({ loadMoreVars: { skip: skip + 10, limit: 10 } });
    setDates([...dates, ...res.data.getCompletedTasks.dates]);
    setTasks([...tasks, ...res.data.getCompletedTasks.tasks]);
    setSkip((prev) => prev + 10);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '800px',
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <Header
        count={normalizedData?.totalCount}
        header="History"
        hasCount={true}
      />
      {dates?.map((date: string, dateInd: number) => {
        const convertedDate = dayjs(date);
        return (
          <Box key={dateInd} mb={2}>
            <Typography
              level="body-sm"
              sx={{
                mb: 2,
                textAlign: 'left',
                fontWeight: 900,
                fontSize: 'md',
                color: 'black',
              }}
            >{`${convertedDate.format('MMM DD, YYYY')} ‧ ${convertedDate.format(
              'dddd'
            )} `}</Typography>
            {tasks
              ?.filter((task: Task) => task.date === date)
              .map((task: Task, taskInd: number) => {
                return (
                  <TaskItem
                    key={taskInd}
                    task={task}
                    index={taskInd}
                    isClickable={false}
                    dividerIndex={0}
                    showOverdueDate
                    optionalOverdueDate={dayjs(task.completedOn).format(
                      'MMM DD, YYYY'
                    )}
                  />
                );
              })}
          </Box>
        );
      })}
      {!loading && dates?.length !== 0 && (
        <Button disabled={disabledShowMoreButton} onClick={handleShowMore}>
          Show more
        </Button>
      )}
    </Box>
  );
};

export default HistoryPage;
