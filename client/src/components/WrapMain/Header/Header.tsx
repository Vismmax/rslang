import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import User from './User';
import Title from './Title';
import MenuButton from './MenuButton';
import Games from './Games';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    menuButton: {
      // [theme.breakpoints.up('sm')]: {
      //   display: 'none',
      // },
    },
    menuBar: {
      // [theme.breakpoints.down('xs')]: {
      //   display: 'none',
      // },
    },
  }),
);

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <div className={classes.menuButton}>
          <MenuButton />
        </div>
        <Title />
        <div className={classes.menuBar}>
          <Games />
        </div>
        <User />
      </Toolbar>
    </AppBar>
  );
}
