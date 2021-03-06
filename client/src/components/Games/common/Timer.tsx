import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    wrap: {
      width: '50%',
      margin: theme.spacing(0, 1),
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(0, 2),
      },
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 3),
      },
    },
  }),
);

interface Props {
  value: number;
  max: number;
}

export default function Timer({ value, max }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress variant='determinate' value={(value * 100) / max} />
    </div>
  );
}
