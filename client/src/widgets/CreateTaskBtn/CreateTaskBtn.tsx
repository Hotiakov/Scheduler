import { Button } from '@mui/material';
import { CreateTaskModal } from 'features/CreateTask';
import { FC } from 'react';
import { classNames } from 'shared/lib/classnames/classnames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import cls from './CreateTaskBtn.module.scss';
import { createTaskActions } from 'features/CreateTask';
import AddIcon from '@mui/icons-material/Add';
import { tasksActions } from 'entities/Task';

interface CreateTaskBtnProps {
   className?: string;
}

export const  CreateTaskBtn: FC<CreateTaskBtnProps> = ({className}) => {
    const {setCurrentTask, setTaskModalOpen} = tasksActions;

    const dispatch = useAppDispatch();

    const handleCloseModal = () => {
        dispatch(setTaskModalOpen(false));
        dispatch(createTaskActions.resetForm());
        dispatch(setCurrentTask(null))
    }

    const handleOpenModal = () => {
        dispatch(setTaskModalOpen(true));
    }

    return (
        <div className={classNames(cls.createtaskbtn, {}, [className])}>
            <Button
                variant='outlined'
                onClick={handleOpenModal}
                color='inherit'
                startIcon={<AddIcon/>}
            >
                Создать задачу
            </Button>

            <CreateTaskModal
                onClose={handleCloseModal}
            />
        </div>
    );
}