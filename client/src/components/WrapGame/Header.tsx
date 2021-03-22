import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { useDispatch } from 'react-redux';
import { setIsOpenSideBar } from '../common/commonSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    grow: {
      flexGrow: 1,
    },
  }),
);

interface IProps {
  fullscreen: boolean;
  onFullscreen: () => void;
}

export default function Header({ fullscreen, onFullscreen }: IProps) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleClickMenu = () => {
    dispatch(setIsOpenSideBar(true));
  };

  const handleClickFullscreen = () => {
    onFullscreen();
  };

  const handleClickClose = () => {
    dispatch(setIsOpenSideBar(true));
  };

  return (
    <AppBar position='fixed' classes={{ root: classes.root }}>
      <Toolbar>
        {!fullscreen && (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={handleClickMenu}
          >
            <MenuIcon />
          </IconButton>
        )}

        <div className={classes.grow} />

        <IconButton
          color='inherit'
          aria-label='menu'
          onClick={handleClickFullscreen}
        >
          {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>

        {!fullscreen && (
          <IconButton
            edge='end'
            color='inherit'
            aria-label='menu'
            onClick={handleClickClose}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
