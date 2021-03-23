import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import UserAvatar from '../LoginPage/UserAvatar';

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

export default function Registration() {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeName = (ev: Ev) => {
    setName(ev.target.value);
  };

  const handleChangeEmail = (ev: Ev) => {
    setEmail(ev.target.value);
  };

  const handleChangePassword = (ev: Ev) => {
    setPassword(ev.target.value);
  };

  const handleChangeAvatar = (url: string) => {
    setAvatar(url);
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate autoComplete='off'>
        <UserAvatar input={true} />
        <TextField
          className={classes.input}
          id='name'
          label='Имя'
          fullWidth
          type='text'
          value={name}
          onChange={handleChangeName}
        />
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
          <Button variant='contained'>Отмена</Button>
          <Button variant='contained' color='primary'>
            Регистрация
          </Button>
        </div>
      </form>
    </div>
  );
}
