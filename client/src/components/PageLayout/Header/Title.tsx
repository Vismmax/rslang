import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    title: {
      flexGrow: 1,
    },
  }),
);

export default function Title() {
  const classes = useStyles();

  return (
    <Typography variant='h6' className={classes.title}>
      RS Lang
    </Typography>
  );
}
