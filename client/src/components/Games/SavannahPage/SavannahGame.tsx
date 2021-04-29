import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import useSound from 'use-sound';

import Fire from '../common/Fire';
import ButtonsWords from '../common/ButtonsWords';
import {
  settingsSavannah,
  settingsSoundOn,
} from '../../SettingsPage/settingsSlice';
import { addAnswerGame, stopGame } from '../gameSlice';
import {
  activeVariantsSavannah,
  activeWordSavannah,
  nextWordSavannah,
} from './savannahSlice';
import trueSfx from '../../../assets/true.mp3';
import falseSfx from '../../../assets/false.mp3';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingTop: theme.spacing(8),
    },
    grid: {
      flexGrow: 1,
    },
    header: {},
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
  const { timeWord, countError, langWordEn } = useSelector(settingsSavannah);
  const soundOn = useSelector(settingsSoundOn);

  const [reserveErrors, setReserveErrors] = useState(countError);
  const [showWord, setShowWord] = useState(false);
  const [showTrueButton, setShowTrueButton] = useState(false);
  const [start, setStart] = useState(false);

  const [trueSound] = useSound(trueSfx, { soundEnabled: soundOn });
  const [falseSound] = useSound(falseSfx, { soundEnabled: soundOn });

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
    if (result) {
      trueSound();
    } else falseSound();

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
    dispatch(stopGame('savannah'));
    console.log('finish');
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container direction='column' spacing={3}>
        <Grid className={classes.header} item container justify='flex-end'>
          <Grid item justify='flex-end' alignItems='center'>
            <Fire max={countError} value={reserveErrors} />
          </Grid>
        </Grid>
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
            langEn={langWordEn}
            onClick={handleClickVariant}
          />
        </Grid>
      </Grid>
      <Slide
        exit={false}
        direction='down'
        in={showWord}
        timeout={timeWord * 1000}
        onEntered={handleEnteredWord}
      >
        <Typography className={classes.word} variant='h3' component='div'>
          {langWordEn ? word.word : word.wordTranslate}
        </Typography>
      </Slide>
    </div>
  );
}
