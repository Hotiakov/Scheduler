import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import React, {
    FC, ReactNode, useCallback, useEffect,
} from 'react';
import { classNames } from 'shared/lib/classnames/classnames';
import { Portal } from 'shared/ui/Portal/Portal';

interface ModalProps {
   className?: string;
   children?: ReactNode;
   lazy?: boolean;
   isOpen: boolean;
   onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  zIndex: 1000,
};

export const PortalModal: FC<ModalProps> = ({
    className, children, isOpen, onClose, lazy = false,
}) => {
    const closeHandler = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    if (lazy && !isMounted) {
        return null;
    }

  return (
    <Modal 
      open={isOpen} 
      onClose={closeHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {
          children
        }
      </Box>
    </Modal>
  );
};
