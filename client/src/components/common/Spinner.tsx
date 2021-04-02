import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    inner: {
      position: 'absolute',
    },
  }),
);

export default function Spinner({ open = true, inner = false }) {
  const classes = useStyles();

  const classRoot = inner ? classes.root + ' ' + classes.inner : classes.root;

  return (
    <Backdrop className={classRoot} open={open}>
      <CircularProgress size={80} color='inherit' />
    </Backdrop>
  );
}
