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
import ButtonsWords from '../common/ButtonsWords';
import CardWord from '../common/CardWord';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Paper, Slide } from '@material-ui/core';
import {
  activeVariantsSavannah,
  activeWordSavannah,
  isLoadingSavannah,
  // newWord,
  nextWordSavannah,
  // start,
  // testTT,
} from './savannahSlice';
import Spinner from '../../common/Spinner';
import { settingsSavannah } from '../../SettingsPage/settingsSlice';
import Typography from '@material-ui/core/Typography';
import { addAnswerGame, stopGame } from '../gameSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      // position: 'relative',
      width: '100%',
      height: '100%',
      flexGrow: 1,
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
    word: {
      textAlign: 'center',
      fontSize: theme.typography.h3.fontSize,
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.h4.fontSize,
      },
      color: 'white',
      textShadow:
        '0px 3px 0px #b2a98f, 0px 14px 10px rgba(0,0,0,0.15), 0px 6px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1)',
    },
  }),
);

export default function SavannahGame() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const word = useSelector(activeWordSavannah);
  const variants = useSelector(activeVariantsSavannah);
  const { timeWord, countError } = useSelector(settingsSavannah);

  const [reserveErrors, setReserveErrors] = useState(countError);
  const [showWord, setShowWord] = useState(false);
  const [showTrueButton, setShowTrueButton] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    dispatch(nextWordSavannah());
    setStart(true);
  }, []);

  useEffect(() => {
    if (!start) {
      setStart(true);
      return;
    }
    if (!word.id) {
      finishGame();
      return;
    }
    setShowTrueButton(false);
    setShowWord(true);
  }, [word]);

  const handleResult = (result: boolean) => {
    setShowWord(false);
    if (!result) {
      if (reserveErrors === 0) {
        finishGame();
        return;
      }
      setReserveErrors(reserveErrors - 1);
    }
    setTimeout(() => {
      fetchNewWord();
    }, 700);
    dispatch(addAnswerGame({ word, result }));
  };

  const fetchNewWord = () => {
    dispatch(nextWordSavannah());
  };

  const handleClickVariant = (isTrue: boolean) => {
    handleResult(isTrue);
  };

  const handleEnteredWord = () => {
    setShowTrueButton(true);
    handleResult(false);
  };

  const finishGame = () => {
    setStart(false);
    dispatch(stopGame());
    console.log('finish');
  };

  return (
    <div className={classes.root}>
      {/*<Toolbar variant='dense' />*/}
      <Grid className={classes.grid} container direction='column' spacing={3}>
        <Grid className={classes.header} item container justify='flex-end'>
          <Grid item justify='flex-end' alignItems='center'>
            <Fire max={countError} value={reserveErrors} />
          </Grid>
        </Grid>
        {/*<Grid*/}
        {/*  className={classes.main}*/}
        {/*  item*/}
        {/*  container*/}
        {/*  justify='center'*/}
        {/*  alignItems='center'*/}
        {/*>*/}
        {/*  /!*<CardWord isOpen={isOpenWord} word={word} />*!/*/}
        {/*</Grid>*/}
        <Grid
          className={classes.footer}
          item
          container
          justify='center'
          alignItems='center'
        >
          <ButtonsWords
            words={variants}
            trueWord={word}
            show={showTrueButton}
            onClick={handleClickVariant}
          />
        </Grid>
      </Grid>
      {/*<Typography className={classes.word} variant='h4'>*/}
      {/*  h1. Заголовок*/}
      {/*</Typography>*/}
      {/*<Typography className={classes.word} variant='h3' component='div'>*/}
      {/*  {word.word}*/}
      {/*</Typography>*/}
      <Slide
        exit={false}
        direction='down'
        in={showWord}
        timeout={timeWord * 1000}
        // mountOnEnter
        // unmountOnExit
        onEntered={handleEnteredWord}
      >
        <Typography className={classes.word} variant='h3' component='div'>
          {word.word}
        </Typography>
      </Slide>
    </div>
  );
}
