import { Box, Typography, Button } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers-pro";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";

import { getCreateTaskForm } from "features/CreateTask/model/selectors/getCreateTask";
import { createTaskActions, createTask } from "features/CreateTask";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";

import { CreateTaskTabs } from "../../CreateTaskTabs/CreateTaskTabs";
import { CreateTaskAutoTab } from "../../CreateTaskAutoTab/CreateTaskAutoTab";
import { CreateTaskSelfTab } from "../../CreateTaskSelfTab/CreateTaskSelfTab";
import { getUserInfo } from "entities/User";
import { useSnackbar } from "notistack";
import { getCurrentTask } from "entities/Task/model/selectors/getTasks";
import { updateTask } from "features/CreateTask/model/services/updateTask";

interface CreateTaskStepTwoProps {
  onGoBack: () => void;
  onClose: () => void;
}

export const CreateTaskStepTwo: FC<CreateTaskStepTwoProps> = ({ onGoBack, onClose }) => {
  const { isLoading, error, ...createTaskProps } = useSelector(getCreateTaskForm);
  const dispatch = useAppDispatch();
  const { dayDuration } = useSelector(getUserInfo);
  const [tabValue, setTabValue] = useState(createTaskProps?.repeatability?.time ? 0 : 1);
  const { enqueueSnackbar } = useSnackbar();
  
  const currentTask = useSelector(getCurrentTask);

  const { setDuration, resetFormSetting } = createTaskActions;

  const { duration } = createTaskProps;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(!currentTask ? createTask(createTaskProps) : updateTask({...createTaskProps, _id: currentTask['_id']}))
      .then(() => {
        enqueueSnackbar("Задача успешно создана", {
          variant: "success",
        });
        onClose();
      })
      .catch(e => {
        enqueueSnackbar("При создании задачи произошла ошибка", {
          variant: "error",
        });
      })
  };

  const handleBack = () => {
    onGoBack();
  };

  const handleChangeDuration = (value: Dayjs) => {
    dispatch(setDuration(value.toDate()));
  };

  const handleTabSwitch = (value: number) => {
    setTabValue(value);
    dispatch(resetFormSetting());
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => handleSubmit(e)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}>
      <Typography variant="h4">Настройки времени</Typography>

      <TimeField name="duration" label="Длительность задачи" required value={dayjs(duration)} onChange={handleChangeDuration} maxTime={dayjs(dayDuration)} fullWidth />

      <CreateTaskTabs value={tabValue} setValue={handleTabSwitch} />
      <CreateTaskSelfTab value={tabValue} />
      <CreateTaskAutoTab value={tabValue} />

      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}>
        <Button variant="outlined" color="secondary" onClick={handleBack}>
          Назад
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {currentTask ? 'Изменить' : 'Создать'}
        </Button>
      </Box>
    </Box>
  );
};
