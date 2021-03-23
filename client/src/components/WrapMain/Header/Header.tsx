import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import User from './User';
import Title from './Title';
import MenuButton from './MenuButton';
import Games from './Games';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import MenuItem from '@material-ui/core/MenuItem';

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
    link: {
      marginLeft: theme.spacing(2),
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
        <Button
          className={classes.link}
          color='inherit'
          startIcon={<GroupIcon />}
          component={RouterLink}
          to='/about'
        >
          Команда
        </Button>
        <Button
          className={classes.link}
          color='inherit'
          startIcon={<SettingsIcon />}
          component={RouterLink}
          to='/settings'
        >
          Настройки
        </Button>
        <User />
      </Toolbar>
    </AppBar>
  );
}
