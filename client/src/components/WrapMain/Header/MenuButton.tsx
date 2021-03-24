import React from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { setIsOpenSideBar } from '../../SideBar/sideBarSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

export default function MenuButton() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsOpenSideBar(true));
  };

  return (
    <IconButton
      edge='start'
      className={classes.menuButton}
      color='inherit'
      aria-label='menu'
      onClick={handleClick}
    >
      <MenuIcon />
    </IconButton>
  );
}
