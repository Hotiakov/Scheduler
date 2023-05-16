import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signUpByUsername } from '../../model/services/signUpByUsername';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { IDateInterval } from 'shared/types/dateInterval';
import { LocalizationProvider, MultiInputTimeRangeField  } from '@mui/x-date-pickers-pro';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useSelector } from 'react-redux';
import { getSignup } from '../../model/selectors/getSignup';
import { CircularProgress } from '@mui/material';

export const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const signupState = useSelector(getSignup);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const from = new Date(`01/01/1970 ${data.get('from')}`);
    const to = new Date(`01/01/1970 ${data.get('to')}`);

    dispatch(signUpByUsername({
      username: data.get('username') as string,
      password: data.get('password') as string,
      dayInterval: {
        from,
        to
      }
    }));
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Имя пользователя"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <MultiInputTimeRangeField
              slotProps={{
                textField: ({ position }) => ({
                  label: position === 'start' ? 'Начало дня' : 'Конец дня',
                  required: true,
                  id: position === 'start' ? 'from' : 'to',
                  name: position === 'start' ? 'from' : 'to',
                  margin: "normal",
                }),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={signupState.isLoading}
            >
                {signupState.isLoading ? <CircularProgress size={20}/> : 'Зарегистрироваться'}
            </Button>
          </Box>
        </Box>
      </Container>
  );
}