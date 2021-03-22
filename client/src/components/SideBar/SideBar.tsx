import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { isOpenSideBarStore, setIsOpenSideBar } from '../common/commonSlice';
import Games from './Games';

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

  return (
    <SwipeableDrawer
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <aside className={classes.aside}>
        <Games />
      </aside>
    </SwipeableDrawer>
  );
}
