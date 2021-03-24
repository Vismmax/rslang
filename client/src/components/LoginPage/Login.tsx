import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import UserAvatar from './UserAvatar';
import { loginUser, userStore } from './userSlice';
import { showNotification } from '../common/Notification/notificationSlice';
import { backRouteStore, setBackRoute } from '../Routes/routeSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    form: {},
    input: {
      marginTop: theme.spacing(3),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-between',
      // marginTop: theme.spacing(5),
      marginTop: theme.spacing(14),
    },
  }),
);

interface Props {
  onCancel: () => void;
}

interface Ev {
  target: {
    value: string;
  };
}

export default function Login({ onCancel }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const backRoute = useSelector(backRouteStore);
  const { userId } = useSelector(userStore);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeEmail = (ev: Ev) => {
    setEmail(ev.target.value);
  };

  const handleChangePassword = (ev: Ev) => {
    setPassword(ev.target.value);
  };

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate autoComplete='off'>
        <UserAvatar input={false} />
        <TextField
          className={classes.input}
          id='login'
          label='Почта'
          fullWidth
          type='email'
          value={email}
          onChange={handleChangeEmail}
        />
        <TextField
          className={classes.input}
          id='password'
          label='Пароль'
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handleChangePassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={classes.buttons}>
          <Button variant='contained' onClick={handleCancel}>
            Отмена
          </Button>
          <Button variant='contained' color='primary' onClick={handleLogin}>
            Вход
          </Button>
        </div>
      </form>
    </div>
  );
}
