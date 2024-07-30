'use client';

import React, { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  Input,
  Textarea,
  Modal,
  FormControl,
  ModalDialog,
} from '@mui/joy';
import dayjs, { type Dayjs } from 'dayjs';
import { FlagOutlined, NotificationsOutlined } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { redirect } from 'next/navigation';
import DateButton from './DateButton';
import {
  GET_TASKS,
  DELETE_TASK,
  SAVE_TASK,
  UPDATE_TASK,
} from '@/app/lib/apolloClient';
import useSession from '@/app/hooks/useSession';
import { extractErrorCode } from './utils';
import {
  InputTask,
  Task,
  UpdatedTaskInput,
} from '@/app/api/graphql/(generatedTypes)/resolversTypes';
import WarningModal from '../WarningModal';

interface TaskModalTemplateProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  fields?: Task;
  isUpdateModal?: boolean;
  showWarningModal?: boolean;
}

const TaskModalTemplate = ({
  open,
  setOpen,
  fields,
  isUpdateModal,
  showWarningModal,
}: TaskModalTemplateProps) => {
  const { loading: sessionLoading } = useSession();
  const [clickedButton, setClickedButton] = useState<string | null>('');
  const [variables, setVariables] = useState<
    InputTask | UpdatedTaskInput | null
  >(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs());
  const [priority, setPriority] = useState<boolean>(
    fields?.priority === undefined ? false : fields.priority
  );
  const [reminders, setReminders] = useState<boolean>(
    fields?.reminders === undefined ? false : fields.reminders
  );

  const [saveTask, { loading: saveLoading, error: saveError }] = useMutation(
    SAVE_TASK,
    {
      refetchQueries: [GET_TASKS],
    }
  );
  const [updateTask, { loading: updateLaoding, error: updateError }] =
    useMutation(UPDATE_TASK, {
      refetchQueries: [GET_TASKS],
    });
  const [deleteTask, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_TASK, {
      refetchQueries: [GET_TASKS],
    });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { task, description } = Object.fromEntries(formData.entries());

    const _variables = {
      task,
      description,
      date: dateValue?.format('YYYY-MM-DD'),
      priority,
      reminders,
      isCompleted: false,
      _id: fields?._id,
    };

    if (showWarningModal) {
      console.log(event.nativeEvent instanceof SubmitEvent, 'zaa');
      //type guard of submitter
      if (!(event.nativeEvent instanceof SubmitEvent)) return;
      const submitter = event.nativeEvent.submitter;
      if (!(submitter instanceof HTMLButtonElement)) return;

      setClickedButton(submitter.name);
      isUpdateModal
        ? setVariables(_variables as UpdatedTaskInput)
        : setVariables(_variables as InputTask);
      setIsWarningModalOpen(true);
    } else {
      await saveTask({
        variables: { newTask: _variables },
      });

      onModalClose();
    }
  };

  const onModalClose = () => {
    setPriority(false);
    setReminders(false);
    setDateValue(dayjs());
    setIsWarningModalOpen(false);
    setOpen(false);
  };

  const onUpdateClick = async () => {
    await updateTask({
      variables: { updatedTask: variables },
    });
    onModalClose();
  };

  const onDeleteClick = async () => {
    await deleteTask({
      variables: { id: fields?._id },
    });
    onModalClose();
  };

  const onConfirmCompeleteClick = async () => {
    await updateTask({
      variables: { updatedTask: { id: fields?._id, isCompleted: true } },
    });
    onModalClose();
  };

  if (saveError || updateError || deleteError) {
    const errorCode = extractErrorCode(
      saveError?.message || updateError?.message || deleteError?.message
    );
    if (errorCode === 401) {
      onModalClose();
      redirect('/login');
    }
    console.log(errorCode);
  }

  const _onConfirmClick = (buttonName: string | null) => {
    switch (buttonName) {
      case 'delete':
        return onDeleteClick;
      case 'update':
        return onUpdateClick;
      case 'complete':
        return onConfirmCompeleteClick;
      default:
        () => {};
    }
  };

  return !sessionLoading ? (
    <>
      {showWarningModal && (
        <WarningModal
          open={isWarningModalOpen}
          setOpen={setIsWarningModalOpen}
          onConfirmClick={_onConfirmClick(clickedButton)}
          copyName={clickedButton === 'delete' ? 'DELETE' : 'UPDATE'}
          loading={saveLoading || updateLaoding || deleteLoading}
        />
      )}
      <Modal
        open={open}
        onClose={() =>
          !saveLoading && !updateLaoding && !deleteLoading && onModalClose()
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ModalDialog
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'auto',
              left: 'auto',
              borderRadius: 0,
              transform: 'none',
              width: '90%',
            },
            p: 3,
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            maxWidth: '700px',
            top: '40%',
          })}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <FormControl>
              <Input
                placeholder="Task name"
                fullWidth
                required
                name="task"
                defaultValue={
                  (fields?.task === undefined ? '' : fields.task) || ''
                }
              />
            </FormControl>
            <FormControl>
              <Textarea
                placeholder="Description"
                required
                name="description"
                defaultValue={
                  (fields?.description === undefined
                    ? ''
                    : fields.description) || ''
                }
              />
            </FormControl>
            <Box
              sx={{ display: 'flex', gap: 1, width: '100%', flexWrap: 'wrap' }}
            >
              <FormControl>
                <DateButton dateValue={dateValue} setDateValue={setDateValue} />
              </FormControl>
              <Button
                variant={priority ? 'solid' : 'outlined'}
                startDecorator={<FlagOutlined />}
                onClick={() => setPriority((prev) => !prev)}
                color={priority ? 'danger' : 'primary'}
              >
                Priority
              </Button>
              <Button
                variant={reminders ? 'solid' : 'outlined'}
                startDecorator={<NotificationsOutlined />}
                onClick={() => setReminders((prev) => !prev)}
                color={reminders ? 'warning' : 'primary'}
              >
                Reminders
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => setOpen(false)}
                  disabled={saveLoading || updateLaoding || deleteLoading}
                >
                  Cancel
                </Button>
                {!isUpdateModal && (
                  <Button
                    variant="solid"
                    color="primary"
                    type="submit"
                    loading={saveLoading}
                    name="submit"
                  >
                    Submit
                  </Button>
                )}
                {isUpdateModal && fields?._id && (
                  <>
                    <Button
                      variant="solid"
                      color="primary"
                      type="submit"
                      loading={updateLaoding}
                      disabled={deleteLoading}
                      name="update"
                    >
                      Update
                    </Button>
                    <Button
                      variant="solid"
                      color="warning"
                      loading={deleteLoading}
                      disabled={updateLaoding}
                      type="submit"
                      name="delete"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </form>
        </ModalDialog>
      </Modal>
    </>
  ) : null;
};

export default TaskModalTemplate;
