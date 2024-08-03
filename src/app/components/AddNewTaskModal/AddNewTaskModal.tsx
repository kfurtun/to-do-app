'use client';

import React from 'react';

import useZustandStore from '@/app/lib/zustand/useZustandStore';
import TaskModalTemplate from '../TaskModalTemplate';
import { useSession } from '../Context/AuthContext';

const AddNewTaskModal = () => {
  const { loading: sessionLoading } = useSession();
  const { isAddTaskOpen, setIsAddTaskOpen } = useZustandStore();

  return !sessionLoading ? (
    <TaskModalTemplate open={isAddTaskOpen} setOpen={setIsAddTaskOpen} />
  ) : null;
};

export default AddNewTaskModal;
