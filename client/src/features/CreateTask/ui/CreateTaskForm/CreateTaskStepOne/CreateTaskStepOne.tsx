import { Box, Button, FormControl, InputLabel, Slider, TextField, Typography } from '@mui/material';
import { getCreateTaskForm } from 'features/CreateTask/model/selectors/getCreateTask';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { createTaskActions } from 'features/CreateTask/model/slice/createTaskSlice';
import { MuiColorInput } from 'mui-color-input';


interface CreateTaskStepOneProps {
    onGoForward: () => void;
}

export const  CreateTaskStepOne: FC<CreateTaskStepOneProps> = ({onGoForward}) => {
    const {name, color, description} = useSelector(getCreateTaskForm);
    const {setName, setDescription, setColor} = createTaskActions;
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        onGoForward();
    }

    const handleChangeName = (value: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setName(value.target.value));
    }

    const handleChangeDescription = (value: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDescription(value.target.value));
    }

    const handleChangeColor = (value: string) => {
        dispatch(setColor(value));
    }

    return (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4">Описание задачи</Typography>
    
          <TextField
            name="name"
            label="Name"
            value={name}
            onChange={handleChangeName}
            fullWidth
            required
          />
    
          <MuiColorInput
            fullWidth
            label='Цвет задачи'
            value={color}
            onChange={handleChangeColor}
            format='hex'
          />
    
          <TextField
            name="description"
            label="Description"
            value={description}
            onChange={handleChangeDescription}
            multiline
            rows={4}
            fullWidth
          />
    
          <Button type="submit" 
            variant="contained" 
            color="primary"
            >
            Далее
          </Button>
        </Box>
      );
}