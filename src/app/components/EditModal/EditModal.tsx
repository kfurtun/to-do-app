import { useState } from 'react';
import TaskModalTemplate from '../TaskModalTemplate';
import useSession from '@/app/hooks/useSession';
import { UPDATE_TASK } from '@/app/lib/apolloClient';
import { Task } from '@/app/api/graphql/(generatedTypes)/resolversTypes';
import { useMutation } from '@apollo/client';

interface EditModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  fields?: Task;
}

const EditModal = ({ open, setOpen, fields }: EditModalProps) => {
  //const { loading: sessionLoading } = useSession();

  return (
    <>
      <TaskModalTemplate
        open={open}
        setOpen={setOpen}
        fields={fields}
        isUpdateModal={true}
        showWarningModal={true}
      />
    </>
  );
};

export default EditModal;
