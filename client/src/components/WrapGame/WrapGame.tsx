import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Header from './Header';
import SettingsGame from './SettingsGame';
import Spinner from '../common/Spinner';
import { countWordsStore, isLoadingStore } from './gameSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
    },
  }),
);

interface Props {
  children: JSX.Element;
}

export default function WrapGame({ children }: Props) {
  const classes = useStyles();
  const fullscreen = useFullScreenHandle();

  const isLoading = useSelector(isLoadingStore);
  const countWords = useSelector(countWordsStore);

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
        <SettingsGame open={!isLoading && !countWords} />
        {isLoading && <Spinner />}
        {children}
      </div>
    </FullScreen>
  );
}
