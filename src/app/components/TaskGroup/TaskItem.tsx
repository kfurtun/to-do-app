import { useState } from 'react';
import { Typography, Stack, Divider, Box, Button } from '@mui/joy';
import CheckIcon from '@mui/icons-material/Check';
import { type Task } from '@/app/api/graphql/(generatedTypes)/resolversTypes';
import { TaskButton } from './TaskGroup.styles';
import DateRange from '@mui/icons-material/DateRange';
import {
  getRefetchQuery,
  showDate,
} from '@/app/components/TaskModalTemplate/utils';
import dayjs from 'dayjs';
import WarningModal from '@/app/components/WarningModal/WarningModal';
import EditModal from '@/app/components/EditModal';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '@/app/lib/apolloClient';
import { usePathname } from 'next/navigation';
import useZustandStore from '@/app/lib/zustand/useZustandStore';

interface TaskItemProps {
  task: Task;
  index: number;
  dividerIndex?: 0;
  showOverdueDate?: boolean;
  isClickable?: boolean;
  optionalOverdueDate?: string;
}

const TaskItem = ({
  task,
  index,
  dividerIndex,
  showOverdueDate,
  isClickable = true,
  optionalOverdueDate,
}: TaskItemProps) => {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const { setHasTaskCompleted } = useZustandStore();
  const pathname = usePathname();
  const refetchQueries = getRefetchQuery(pathname);
  const alwaysShowIcon = !isClickable;

  const [updateTask, { loading: updateLaoding, error: updateError }] =
    useMutation(UPDATE_TASK, {
      refetchQueries: [refetchQueries],
    });

  const onConfirmCompeleteClick = async () => {
    await updateTask({
      variables: {
        updatedTask: {
          _id: task._id,
          isCompleted: true,
          completedOn: dayjs().format('YYYY-MM-DD'),
        },
      },
    });
    setHasTaskCompleted(true);
    setIsWarningModalOpen(false);
  };

  return (
    <>
      <WarningModal
        open={isWarningModalOpen}
        setOpen={setIsWarningModalOpen}
        onConfirmClick={onConfirmCompeleteClick}
        copyName="COMPLETE"
        loading={updateLaoding}
      />
      <EditModal
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        fields={{ ...task }}
      />
      {index === dividerIndex && <Divider />}
      <Box
        key={task._id}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
          bgcolor: 'transparent',
          borderRadius: '4px',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} width="100%">
          <TaskButton
            onClick={() => setIsWarningModalOpen(true)}
            variant="outlined"
            color="neutral"
            disabled={!isClickable}
          >
            <CheckIcon
              className={!alwaysShowIcon ? 'check-icon' : 'check-icon-always'}
            />
          </TaskButton>
          <Button
            variant="plain"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              width: '100%',
              alignItems: 'flex-start',
            }}
            onClick={() => {
              setIsEditModalOpen(true);
            }}
            disabled={!isClickable}
          >
            <Typography level="h4" sx={{ textAlign: 'left', fontSize: 14 }}>
              {task.task}
            </Typography>
            <Typography
              level="body-sm"
              sx={{ textAlign: 'left', fontSize: 12 }}
            >
              {task.description}
            </Typography>
            {showOverdueDate && (
              <Typography
                level="body-sm"
                sx={{
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: 12,
                }}
                color="danger"
              >
                {!optionalOverdueDate && <DateRange fontSize="small" />}
                {optionalOverdueDate
                  ? `Completed on ${optionalOverdueDate}`
                  : showDate(dayjs(task.date))}
              </Typography>
            )}
          </Button>
        </Stack>
      </Box>
      <Divider />
    </>
  );
};

export default TaskItem;
