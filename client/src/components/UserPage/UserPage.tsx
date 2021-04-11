import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { validate } from 'email-validator';

import UserAvatar from '../LoginPage/UserAvatar';
import PageLayout from '../PageLayout/PageLayout';
import { deleteUser, updateUser, userStore } from '../LoginPage/userSlice';
import routesData from '../Routes/routesData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    background: {
      backgroundImage: `url(${routesData.user.background})`,
    },
    panel: {
      maxWidth: theme.spacing(62),
      padding: theme.spacing(3),
    },
    form: {},
    input: {
      marginTop: theme.spacing(3),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(5),
    },
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    wrap: {
      position: 'relative',
    },
    inputFile: {
      display: 'none',
    },
    buttonFile: {
      position: 'absolute',
      bottom: -theme.spacing(1),
      left: '50%',
      marginLeft: theme.spacing(1),
    },
  }),
);

interface Ev {
  target: {
    value: string;
  };
}

export default function Registration() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userStore);

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState({ value: user.name, err: '' });
  const [email, setEmail] = useState({ value: user.email, err: '' });
  const [password, setPassword] = useState({ value: '', err: '' });
  const [avatar, setAvatar] = useState({ value: user.avatar, err: '' });

  useEffect(() => {
    setName({ ...name, value: user.name });
    setEmail({ ...email, value: user.email });
    setAvatar({ ...avatar, value: user.avatar });
  }, [user]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeName = (ev: Ev) => {
    setName({ err: '', value: ev.target.value });
  };

  const handleChangeEmail = (ev: Ev) => {
    setEmail({ err: '', value: ev.target.value });
  };

  const handleChangePassword = (ev: Ev) => {
    setPassword({ err: '', value: ev.target.value });
  };

  const handleChangeAvatar = (url: string) => {
    setAvatar({ ...avatar, value: url });
  };

  const handleUpdateUser = async () => {
    if (!name.value) {
      setName({ ...name, err: 'Введите имя' });
      return;
    }
    if (!validate(email.value)) {
      setEmail({ ...email, err: 'Введите коректный адрес почты' });
      return;
    }
    if (password.value.length < 8) {
      setPassword({
        ...password,
        err: 'Пароль должен быть не менее 8 символов',
      });
      return;
    }

    dispatch(
      updateUser({
        name: name.value,
        email: email.value,
        password: password.value,
        avatar: avatar.value,
      }),
    );
  };

  const handleDeleteUser = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Вы точно хотите удалить пользователя и все его данные?')) {
      dispatch(deleteUser());
      history.push('/');
    }
  };

  return (
    <PageLayout background={classes.background}>
      <div className={classes.root}>
        <Paper className={classes.panel}>
          <form className={classes.form} noValidate autoComplete='off'>
            <UserAvatar
              input={true}
              value={avatar.value}
              onChange={handleChangeAvatar}
            />
            <TextField
              className={classes.input}
              id='name'
              label='Имя'
              fullWidth
              type='text'
              error={!!name.err}
              helperText={name.err ? name.err : ''}
              value={name.value}
              onChange={handleChangeName}
            />
            <TextField
              className={classes.input}
              id='login'
              label='Почта'
              fullWidth
              type='email'
              error={!!email.err}
              helperText={email.err ? email.err : ''}
              value={email.value}
              onChange={handleChangeEmail}
            />
            <TextField
              className={classes.input}
              id='password'
              label='Пароль'
              fullWidth
              type={showPassword ? 'text' : 'password'}
              error={!!password.err}
              helperText={password.err ? password.err : ''}
              value={password.value}
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
              <Button color='secondary' onClick={handleDeleteUser}>
                Удалить
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={handleUpdateUser}
              >
                Сохранить
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </PageLayout>
  );
}
