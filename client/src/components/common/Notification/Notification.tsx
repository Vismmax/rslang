import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import {
  isOpenNotification,
  messageNotification,
  typeNotification,
  setOpen,
} from './notificationSlice';

export default function Notification() {
  const dispatch = useDispatch();
  const open = useSelector(isOpenNotification);
  const message = useSelector(messageNotification);
  const type = useSelector(typeNotification);

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert variant='filled' severity={type} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
