export interface WarningModalCopy {
  content: string;
  buttonText: string;
}

interface WarningModalCopyByType {
  [key: string]: WarningModalCopy;
}

export const WARNING_MODAL_COPY_BY_TYPE: WarningModalCopyByType = {
  COMPLETE: {
    content: ' Are you sure you want to mark this task as completed?',
    buttonText: 'Confirm',
  },
  UPDATE: {
    content: ' Are you sure you want to update this task?',
    buttonText: 'Update',
  },
  DELETE: {
    content: ' Are you sure you want to delete this task?',
    buttonText: 'Delete',
  },
};
