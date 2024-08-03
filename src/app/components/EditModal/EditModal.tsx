import TaskModalTemplate from '../TaskModalTemplate';
import { Task } from '@/app/api/graphql/(generatedTypes)/resolversTypes';

interface EditModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  fields?: Task;
}

const EditModal = ({ open, setOpen, fields }: EditModalProps) => {
  return (
    <TaskModalTemplate
      open={open}
      setOpen={setOpen}
      fields={fields}
      isUpdateModal={true}
      showWarningModal={true}
    />
  );
};

export default EditModal;
