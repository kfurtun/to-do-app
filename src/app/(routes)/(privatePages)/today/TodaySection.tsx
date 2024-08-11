import { Typography, Button, Box } from '@mui/joy';
import { type Task } from '@/app/api/graphql/(generatedTypes)/resolversTypes';
import dayjs from 'dayjs';
import TaskGroup from '@/app/components/TaskGroup';

interface TodaySectionProps {
  data?: Task[];
  setIsAddTaskOpen: (value: boolean) => void;
}

const TodaySection = ({ data, setIsAddTaskOpen }: TodaySectionProps) => {
  const todayDate = dayjs().format('MMM DD');
  const todayDay = dayjs().format('dddd');
  return (
    <Box>
      <Typography
        level="body-sm"
        sx={{
          mb: 2,
          textAlign: 'left',
          fontWeight: 900,
          fontSize: 'md',
          color: 'black',
        }}
      >{`${todayDate} ‧ Today ‧ ${todayDay}`}</Typography>
      <TaskGroup data={data} dividerIndex={0} />
      <Box display="flex" alignItems="flex-start" width="100%">
        <Button
          variant="plain"
          sx={{ display: 'inline-flex', alignItems: 'center', mt: 2 }}
          onClick={() => setIsAddTaskOpen(true)}
        >
          + Add task
        </Button>
      </Box>
    </Box>
  );
};

export default TodaySection;
