import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Header from './Header';
import SettingsGame from './SettingsGame';
import Spinner from '../../common/Spinner';
import {
  clearGame,
  // countWordsStore,
  initGame,
  isBeginGame,
  isLoadingGame,
  isStartGame,
  isStopGame,
  resetGame,
  // isRunningGame,
  routeGame,
  setLevelGame,
  startGame,
} from '../gameSlice';
import { clearCurrentGroupPage } from '../../../common/helpers/localCurrentPage';
import { useHistory } from 'react-router-dom';
import { Starter } from '../common/Starter';
import ResultGame from './ResultGame';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100vw',
      // height: '100vh',
      // minWidth: '100vw',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
  }),
);

interface Props {
  children: JSX.Element | (JSX.Element | null | boolean)[] | null | boolean;
  className?: string;
}

export default function GameLayout({ children, className = '' }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const fullscreen = useFullScreenHandle();

  const isLoading = useSelector(isLoadingGame);
  const isBegin = useSelector(isBeginGame);
  const isStart = useSelector(isStartGame);
  const isStop = useSelector(isStopGame);
  const route = useSelector(routeGame);

  // const isRunning = useSelector(isRunningGame);

  useEffect(() => {
    dispatch(initGame());
    return () => {
      dispatch(clearGame());
    };
  }, []);

  const handleFullScreen = () => {
    fullscreen.active ? fullscreen.exit() : fullscreen.enter();
  };

  const handleChangeLevel = (level: number) => {
    console.log('ChangeLevel');
    dispatch(setLevelGame(level));
  };

  const handleStartGame = () => {
    dispatch(startGame());
  };

  const handleExit = () => {
    history.push(route);
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  return (
    <FullScreen handle={fullscreen}>
      <div className={`${classes.root} ${className}`}>
        <Header
          fullscreen={fullscreen.active}
          onFullscreen={handleFullScreen}
          onClose={handleExit}
        />

        <SettingsGame
          open={!isBegin}
          onChange={handleChangeLevel}
          onCancel={handleExit}
        />

        <ResultGame open={isStop} onReset={handleReset} onCancel={handleExit} />

        {/*{isLoading && <Spinner />}*/}
        {isBegin && !isStart && !isStop && <Starter onStop={handleStartGame} />}
        {/*{isBegin && <Starter onStop={handleStartGame} />}*/}
        {/*<Starter onStop={handleStartGame} open={true} />*/}
        {isBegin && !isStop && children}
      </div>
    </FullScreen>
  );
}
