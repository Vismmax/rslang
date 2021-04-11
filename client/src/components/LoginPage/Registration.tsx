import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { validate } from 'email-validator';

import UserAvatar from './UserAvatar';
import { registrationUser } from './userSlice';

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

interface Props {
  onCancel: () => void;
}

export default function Registration({ onCancel }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState({ value: '', err: '' });
  const [email, setEmail] = useState({ value: '', err: '' });
  const [password, setPassword] = useState({ value: '', err: '' });
  const [avatar, setAvatar] = useState({ value: '', err: '' });

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

  const handleAddUser = async () => {
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
      registrationUser({
        name: name.value,
        email: email.value,
        password: password.value,
        avatar: avatar.value,
      }),
    );
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={classes.root}>
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
          <Button variant='contained' onClick={handleCancel}>
            Отмена
          </Button>
          <Button variant='contained' color='primary' onClick={handleAddUser}>
            Регистрация
          </Button>
        </div>
      </form>
    </div>
  );
}
