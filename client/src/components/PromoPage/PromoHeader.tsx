import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

import { setIsOpenSideBar } from '../SideBar/sideBarSlice';
import { userStore } from '../LoginPage/userSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    grow: {
      flexGrow: 1,
    },
    login: {
      opacity: 0.7,
    },
  }),
);

export default function PromoHeader() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(userStore);

  const handleClickMenu = () => {
    dispatch(setIsOpenSideBar(true));
  };

  return (
    <AppBar position='fixed' classes={{ root: classes.root }}>
      <Toolbar variant='dense'>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={handleClickMenu}
        >
          <MenuIcon />
        </IconButton>

        <div className={classes.grow} />

        {!user.userId && (
          <Button
            className={classes.login}
            component={RouterLink}
            to='/login'
            color='inherit'
          >
            Войти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
