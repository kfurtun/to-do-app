'use client';

import React from 'react';

import useZustandStore from '@/app/lib/zustand/useZustandStore';
import useSession from '@/app/hooks/useSession';
import TaskModalTemplate from '../TaskModalTemplate';

const AddNewTaskModal = () => {
  const { loading: sessionLoading } = useSession();
  const { isAddTaskOpen, setIsAddTaskOpen } = useZustandStore();

  return !sessionLoading ? (
    <TaskModalTemplate open={isAddTaskOpen} setOpen={setIsAddTaskOpen} />
  ) : null;
};

export default AddNewTaskModal;
