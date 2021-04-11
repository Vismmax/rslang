import React from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { uploadImage } from '../../api/services/imageService';
import { showNotificationError } from '../common/Notification/notificationSlice';
import user from '../../assets/user.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    input: {
      display: 'none',
    },
    button: {
      position: 'absolute',
      bottom: -theme.spacing(1),
      left: '50%',
      marginLeft: theme.spacing(1),
    },
    disable: {
      display: 'none',
    },
  }),
);

interface Props {
  input?: boolean;
  value?: string;
  onChange?: (url: string) => void;
}

export default function UserAvatar({
  input = false,
  value = user,
  onChange = () => {},
}: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChangeAvatar = async (e: any) => {
    const url = await uploadImage(e.target.files[0]);
    if (url) {
      onChange(url);
    } else {
      dispatch(showNotificationError('Не удалось загрузить аватар на сервер'));
      console.log('Не удалось загрузить аватар на сервер');
    }
  };

  return (
    <div className={classes.root}>
      <Avatar alt='Пользователь' src={value} className={classes.avatar} />
      <div className={input ? classes.button : classes.disable}>
        <input
          accept='image/*'
          className={classes.input}
          id='icon-button-file'
          type='file'
          onChange={handleChangeAvatar}
        />
        <label htmlFor='icon-button-file'>
          <IconButton
            color='primary'
            aria-label='upload picture'
            component='span'
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </div>
    </div>
  );
}
