import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { isOpenSideBarStore, setIsOpenSideBar } from './sideBarSlice';
import ListGames from './ListGames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link as RouterLink } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EqualizerIcon from '@material-ui/icons/Equalizer';

const useStyles = makeStyles({
  aside: {
    minWidth: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SideBar() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const isOpen = useSelector(isOpenSideBarStore);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    dispatch(setIsOpenSideBar(open));
  };

  const closeSideBar = () => {
    dispatch(setIsOpenSideBar(false));
  };

  return (
    <SwipeableDrawer
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <aside className={classes.aside}>
        <List>
          <ListItem
            button
            component={RouterLink}
            to='/textbook'
            onClick={closeSideBar}
          >
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary='Учебник' />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to='/dictionary'
            onClick={closeSideBar}
          >
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary='Словарь' />
          </ListItem>
        </List>
        <ListGames closeSideBar={closeSideBar} />
        <List>
          <ListItem
            button
            component={RouterLink}
            to='/statistics'
            onClick={closeSideBar}
          >
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary='Статистика' />
          </ListItem>
        </List>
        <List>
          <ListItem
            button
            component={RouterLink}
            to='/about'
            onClick={closeSideBar}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary='Команда' />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to='/settings'
            onClick={closeSideBar}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary='Настройки' />
          </ListItem>
        </List>
      </aside>
    </SwipeableDrawer>
  );
}
