import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import GameLayout from '../GameLayout/GameLayout';
import Fire from '../common/Fire';
import Timer from '../common/Timer';
import { wordsStore } from '../gameSlice';
import ButtonsWords from '../common/ButtonsWords';
import CardWord from '../common/CardWord';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Slide } from '@material-ui/core';
import {
  activeVariantsSavannah,
  activeWordSavannah,
  isLoadingSavannah,
  newWord,
  start,
  testTT,
} from './savannahSlice';
import Spinner from '../../common/Spinner';
import { settingsSavannah } from '../../SettingsPage/settingsSlice';
import { useTimer } from './useTimer';
import { useInterval } from './useInterval';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      // position: 'relative',
      width: '100%',
      height: '100%',
      padding: theme.spacing(3),
      paddingTop: theme.spacing(8),
      // backgroundImage: 'url("/img/g1.jpg")',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
    },
    grid: {
      flexGrow: 1,
    },
    header: {
      // flexGrow: 1,
    },
    main: {
      flexGrow: 2,
    },
    footer: {
      flexGrow: 1,
    },
  }),
);

const delay = 250;

export default function SavannahGame() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const word = useSelector(activeWordSavannah);
  const variants = useSelector(activeVariantsSavannah);
  const { timeWord, countError } = useSelector(settingsSavannah);

  const [timerWordId, setTimerWordId] = useState<number>();
  const [timerOpenWordId, setTimerOpenWordId] = useState<number>();
  const [time, setTime] = useState(0);
  const [isOpenWord, setIsOpenWord] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [reserveErrors, setReserveErrors] = useState(countError);

  // useInterval(
  //   () => {
  //     // console.log('UseTimer time: ', time);
  //     // console.log('isRunning: ', isRunning);
  //     setTime(time + delay / 1000);
  //   },
  //   isRunning ? delay : null,
  // );

  useEffect(() => {
    dispatch(start());

    return () => {
      clearInterval(timerWordId);
      clearTimeout(timerOpenWordId);
    };
  }, []);

  useEffect(() => {
    if (!word.id) return;
    console.log('render!!!!');
    clearInterval(timerWordId);
    setTime(0);
    const intervalId = window.setInterval(() => {
      setTime((prevTime) => prevTime + delay / 1000);
    }, delay);
    setTimerWordId(intervalId);
  }, [word]);

  useEffect(() => {
    if (time === timeWord) openWord(false);
  }, [time]);

  const openWord = (isTrue: boolean) => {
    clearInterval(timerWordId);
    setTime(0);
    setIsOpenWord(true);
    const timeout = window.setTimeout(() => {
      setIsOpenWord(false);
      fetchNewWord();
    }, 1500);
    setTimerOpenWordId(timeout);
    if (!isTrue) {
      if (reserveErrors === 0) {
      } // todo конец игры
      setReserveErrors(reserveErrors - 1);
    }
  };

  const fetchNewWord = () => {
    dispatch(newWord());
  };

  const handleClickVariant = (isTrue: boolean) => {
    openWord(isTrue);
  };

  return (
    <div className={classes.root}>
      {/*<Toolbar variant='dense' />*/}
      <Grid className={classes.grid} container direction='column' spacing={3}>
        <Grid className={classes.header} item container spacing={3}>
          <Grid item xs={false} sm={3}></Grid>
          <Grid item container xs={6} sm={6} alignItems='center'>
            <Timer value={time} max={timeWord} />
          </Grid>
          <Grid item xs={5} sm={3} justify='flex-end' alignItems='center'>
            <Fire max={5} value={reserveErrors} />
          </Grid>
        </Grid>
        <Grid
          className={classes.main}
          item
          container
          justify='center'
          alignItems='center'
        >
          <CardWord isOpen={isOpenWord} word={word} />
        </Grid>
        <Grid
          className={classes.footer}
          item
          justify='center'
          alignItems='center'
        >
          <ButtonsWords
            words={variants}
            trueWord={word}
            onClick={handleClickVariant}
          />
        </Grid>
      </Grid>
      {/*<Fire max={5} value={3} />*/}
      {/*<Timer value={50} />*/}
      {/*<CardWord isOpen={true} word={tw[1]} />*/}
      {/*<ButtonsWords*/}
      {/*  words={[tw[0], tw[1], tw[2], tw[3]]}*/}
      {/*  trueWord={tw[1]}*/}
      {/*  onClick={(tt: boolean) => {}}*/}
      {/*/>*/}
    </div>
  );
}
