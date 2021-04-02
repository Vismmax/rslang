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
  // isRunningGame,
  routeGame,
  setLevelGame,
  startGame,
} from '../gameSlice';
import { clearCurrentGroupPage } from '../../../common/helpers/localCurrentPage';
import { useHistory } from 'react-router-dom';
import { Starter } from '../common/Starter';

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

  return (
    <FullScreen handle={fullscreen}>
      <div className={`${classes.root} ${className}`}>
        <Header
          fullscreen={fullscreen.active}
          onFullscreen={handleFullScreen}
        />

        <SettingsGame
          open={!isBegin}
          onChange={handleChangeLevel}
          onCancel={handleExit}
        />

        {/*{isLoading && <Spinner />}*/}
        {isBegin && !isStart && <Starter onStop={handleStartGame} />}
        {/*{isBegin && <Starter onStop={handleStartGame} />}*/}
        {/*<Starter onStop={handleStartGame} open={true} />*/}
        {isBegin && children}
      </div>
    </FullScreen>
  );
}
