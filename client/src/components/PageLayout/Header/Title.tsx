import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

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
    <div className={classes.title}>
      <Link
        component={RouterLink}
        to='/'
        variant='h6'
        color='inherit'
        underline='none'
      >
        RS Lang
      </Link>
    </div>
  );
}
