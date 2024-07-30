import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { WARNING_MODAL_COPY_BY_TYPE } from './constants';

interface WarningModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  copyName: string;
  onConfirmClick?: () => Promise<void>;
  loading: boolean;
}

const WarningModal = ({
  open,
  setOpen,
  loading,
  copyName,
  onConfirmClick,
}: WarningModalProps) => {
  return (
    <Modal open={open} onClose={() => !loading && setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent>
          {WARNING_MODAL_COPY_BY_TYPE[copyName].content}
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            color="primary"
            onClick={onConfirmClick}
            loading={loading}
          >
            {WARNING_MODAL_COPY_BY_TYPE[copyName].buttonText}
          </Button>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default WarningModal;
