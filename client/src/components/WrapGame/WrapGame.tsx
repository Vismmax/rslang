import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Container from '@material-ui/core/Container';
import Header from './Header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: 'flex',
      // flexDirection: 'column',
      width: '100vw',
      height: '100vh',
      //   backgroundImage: 'url("/img/bg.jpg")',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center top',
    },
  }),
);

export default function WrapMain() {
  const classes = useStyles();

  const fullscreen = useFullScreenHandle();

  const handleFullScreen = () => {
    fullscreen.active ? fullscreen.exit() : fullscreen.enter();
  };

  return (
    <FullScreen handle={fullscreen}>
      <div className={classes.root}>
        <Header
          fullscreen={fullscreen.active}
          onFullscreen={handleFullScreen}
        />
      </div>
    </FullScreen>
  );
}
