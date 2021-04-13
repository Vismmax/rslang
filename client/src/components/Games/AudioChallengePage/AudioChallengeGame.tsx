import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import useSound from 'use-sound';
import 'react-awesome-slider/dist/styles.css';

import { addAnswerGame, stopGame } from '../gameSlice';
import AudioChallengeCard from './AudioChallengeCard';
import ButtonsWords from '../common/ButtonsWords';
import ButtonNext from '../common/ButtonNext';
import {
  activeVariantsAudioChallenge,
  activeWordAudioChallenge,
  nextWordAudioChallenge,
} from './audioChallengeSlice';
import trueSfx from '../../../assets/true.mp3';
import falseSfx from '../../../assets/false.mp3';
import './AudioChallenge.css';
import { settingsAudioChallenge } from '../../SettingsPage/settingsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center',
      flexGrow: 1,
      paddingTop: theme.spacing(8),
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(3),
      },
    },

    card: {
      maxWidth: theme.spacing(40),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    space: {
      margin: theme.spacing(2, 0),
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(4, 0),
      },
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(6, 0),
      },
    },
  }),
);

export default function AudioChallengeGame() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const word = useSelector(activeWordAudioChallenge);
  const variants = useSelector(activeVariantsAudioChallenge);
  const settings = useSelector(settingsAudioChallenge);

  const [isOpenCard, setIsOpenCard] = useState(false);
  const [showTrueButton, setShowTrueButton] = useState(false);
  const [start, setStart] = useState(false);
  const [showSlide, setShowSlide] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const [trueSound] = useSound(trueSfx);
  const [falseSound] = useSound(falseSfx);

  useEffect(() => {
    dispatch(nextWordAudioChallenge());
    setShowSlide(true);
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
  }, [word]);

  const handleResult = (result: boolean) => {
    if (result) {
      trueSound();
    } else falseSound();
    setIsOpenCard(true);
    dispatch(addAnswerGame({ word, result }));
  };

  const fetchNewWord = () => {
    dispatch(nextWordAudioChallenge());
  };

  const handleClickVariant = (isTrue: boolean) => {
    handleResult(isTrue);
  };

  const handleClickNext = () => {
    if (!isOpenCard) {
      setShowTrueButton(true);
      handleResult(false);
    } else {
      setIsOpenCard(false);
      setShowTrueButton(false);

      setDirection('right');
      setShowSlide(false);
      fetchNewWord();
    }
  };

  const handleExited = () => {
    setDirection('left');
    setShowSlide(true);
  };

  const handleEntered = () => {};

  const finishGame = () => {
    setStart(false);
    dispatch(stopGame('audioChallenge'));
    console.log('finish');
  };

  return (
    <div className={classes.root}>
      <Slide
        exit={true}
        direction={direction}
        in={showSlide}
        timeout={500}
        mountOnEnter
        unmountOnExit
        onEntered={handleEntered}
        onExited={handleExited}
      >
        <Grid container direction='column' justify='center'>
          <Grid item container direction='column'>
            <Grid className={classes.card}>
              <AudioChallengeCard isOpen={isOpenCard} word={word} />
            </Grid>
          </Grid>
          <Grid className={classes.space} item>
            <ButtonsWords
              words={variants}
              trueWord={word}
              show={showTrueButton}
              langEn={settings.langWordEn}
              onClick={handleClickVariant}
            />
          </Grid>
          <Grid item container justify='center'>
            <ButtonNext isOpenCard={isOpenCard} onClick={handleClickNext} />
          </Grid>
        </Grid>
      </Slide>
    </div>
  );
}
