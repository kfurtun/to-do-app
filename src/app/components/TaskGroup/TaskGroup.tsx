import { LinearProgress } from '@mui/joy';
import TaskItem from './TaskItem';
import { type Task } from '@/app/api/graphql/(generatedTypes)/resolversTypes';

interface TaskGroupProps {
  data?: Task[];
  dividerIndex?: 0;
  showOverdueDate?: boolean;
}

const TaskGroup = ({ data, dividerIndex, showOverdueDate }: TaskGroupProps) => {
  return (
    <>
      {!data ? (
        <LinearProgress variant="plain" />
      ) : (
        data.map((task, index) => (
          <TaskItem
            task={task}
            index={index}
            key={task._id}
            dividerIndex={dividerIndex}
            showOverdueDate={showOverdueDate}
          />
        ))
      )}
    </>
  );
};

export default TaskGroup;
