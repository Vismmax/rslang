import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Header from './Header';
import SettingsGame from './SettingsGame';
import Spinner from '../../common/Spinner';
import { countWordsStore, isLoadingGame, isRunningGame } from '../gameSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
    },
  }),
);

interface Props {
  children: JSX.Element | (JSX.Element | null | boolean)[] | null | boolean;
  className?: string;
}

export default function GameLayout({ children, className = '' }: Props) {
  const classes = useStyles();
  const fullscreen = useFullScreenHandle();

  const isLoading = useSelector(isLoadingGame);
  const isRunning = useSelector(isRunningGame);
  const countWords = useSelector(countWordsStore);

  const handleFullScreen = () => {
    fullscreen.active ? fullscreen.exit() : fullscreen.enter();
  };

  return (
    <FullScreen handle={fullscreen}>
      <div className={`${classes.root} ${className}`}>
        <Header
          fullscreen={fullscreen.active}
          onFullscreen={handleFullScreen}
        />

        <SettingsGame open={!isLoading && !countWords} />

        {isLoading && <Spinner />}
        {/*{!isLoading && countWords && children}*/}
        {isRunning && children}
      </div>
    </FullScreen>
  );
}
