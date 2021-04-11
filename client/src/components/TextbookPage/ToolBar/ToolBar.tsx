import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Settings from './Settings';
import Games from './Games';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'sticky',
    top: 0,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
}));

interface Props {
  title: string;
}

export default function ToolBar({ title }: Props) {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position='static' color='default'>
      <Toolbar variant='dense'>
        <Typography variant='h6' className={classes.title}>
          {title}
        </Typography>
        <Games />
        <Settings />
      </Toolbar>
    </AppBar>
  );
}
