import { getCurrentTask, getTaskModalOpen } from 'entities/Task/model/selectors/getTasks';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { PortalModal } from 'shared/ui/Modal/Modal';
import { CreateTaskStepOne } from '../CreateTaskForm/CreateTaskStepOne/CreateTaskStepOne';
import { CreateTaskStepTwo } from '../CreateTaskForm/CreateTaskStepTwo/CreateTaskStepTwo';
import { createTaskActions } from 'features/CreateTask/model/slice/createTaskSlice';
import { tasksActions } from 'entities/Task';
import { Box, Button } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { removeTask } from 'features/CreateTask/model/services/removeTask';
import { enqueueSnackbar } from 'notistack';

interface CreateTaskModalProps {
   className?: string;
   onClose: () => void;
};

export const  CreateTaskModal: FC<CreateTaskModalProps> = ({className, onClose }) => {
  const [step, setStep] = useState(0);
  const currentTask = useSelector(getCurrentTask);
  const dispatch = useAppDispatch();
  const {setTaskForm} = createTaskActions;
  const {setTaskModalOpen} = tasksActions;
  const isOpen = useSelector(getTaskModalOpen);

  useEffect(() => {
      if(!isOpen){
        setStep(0);
      }
  }, [isOpen]);

  useEffect(() => {
    if(currentTask){
      dispatch(setTaskForm(currentTask));
      dispatch(setTaskModalOpen(true));
    }
  }, [currentTask]);



  const handleGoBack = () => {
    setStep(0);
  };

  const handleGoForward = () => {
    setStep(1);
  };

  const handleDelete = () => {
    dispatch(removeTask(currentTask['_id'])).then(() => {
      enqueueSnackbar("Задача успешно удалена", {
        variant: "success",
      });
      onClose();
    })
    .catch((e) => {
      enqueueSnackbar("При удалении произошла ошибка", {
        variant: "error",
      })
    });
  }
  return (
    <PortalModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <Box>
        {currentTask && 
        <Button 
          variant='outlined' 
          onClick={handleDelete}
          size='small' 
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          <DeleteOutlined />
        </Button>
        }
        <>
          {
            step === 0 ? (
              <CreateTaskStepOne
                onGoForward={handleGoForward}
              />
            ) : (
              <CreateTaskStepTwo
                onGoBack={handleGoBack}
                onClose={onClose}
              />
            )
          }
      </>
      </Box>
    </PortalModal>
  );
}