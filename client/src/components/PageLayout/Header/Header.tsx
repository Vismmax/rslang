import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MovieIcon from '@material-ui/icons/Movie';

import User from './User';
import Title from './Title';
import MenuButton from './MenuButton';
import Games from './Games';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    menuButton: {
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
    menuBar: {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    link: {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
  }),
);

export default function Header() {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <AppBar id='app-header' position='static'>
      <Toolbar>
        <div className={classes.menuButton}>
          <MenuButton />
        </div>
        <Title />
        <Button
          className={classes.link}
          color='inherit'
          startIcon={<LocalLibraryIcon />}
          component={RouterLink}
          to='/textbook'
        >
          Учебник
        </Button>
        <Button
          className={classes.link}
          color='inherit'
          startIcon={<MenuBookIcon />}
          component={RouterLink}
          to='/dictionary'
        >
          Словарь
        </Button>
        {pathname !== '/textbook' && pathname !== '/dictionary' && (
          <div className={classes.menuBar}>
            <Games />
          </div>
        )}
        <Button
          className={classes.link}
          color='inherit'
          startIcon={<EqualizerIcon />}
          component={RouterLink}
          to='/statistics'
        >
          Статистика
        </Button>
        <Button
          className={classes.link}
          color='inherit'
          startIcon={<MovieIcon />}
          component={RouterLink}
          to='/promo'
        >
          Обзор
        </Button>
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
