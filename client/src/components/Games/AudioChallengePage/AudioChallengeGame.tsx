import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import GameLayout from '../GameLayout/GameLayout';
import Spinner from '../../common/Spinner';
import AudioChallengeInit from '../AudioChallengePage/AudioChallengeInit';
import { isStartGame } from '../gameSlice';
import {
  activeVariantsAudioChallenge,
  activeWordAudioChallenge,
  allWordsAudioChallenge,
  countWordsAudioChallenge,
  isLoadingAudioChallenge,
  nextWordAudioChallenge,
} from './audioChallengeSlice';
import Grid from '@material-ui/core/Grid';
import AudioChallengeCard from './AudioChallengeCard';
import ButtonsWords from '../common/ButtonsWords';
import Button from '@material-ui/core/Button';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import './AudioChallenge.css';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Paper, Slide } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // width: '100%',
      // height: '100%',
      // flexGrow: 1,
      // padding: theme.spacing(3),
      paddingTop: theme.spacing(8),
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
    button: {
      width: theme.spacing(20),
      opacity: 0.8,
    },
  }),
);

export default function AudioChallengeGame() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const word = useSelector(activeWordAudioChallenge);
  const variants = useSelector(activeVariantsAudioChallenge);

  const [isOpenCard, setIsOpenCard] = useState(false);
  const [showTrueButton, setShowTrueButton] = useState(false);
  const [start, setStart] = useState(false);
  const [showSlide, setShowSlide] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  useEffect(() => {
    dispatch(nextWordAudioChallenge());
    setShowSlide(true);
  }, []);

  useEffect(() => {
    if (!start) return;
    if (!word.id) {
      finishGame();
      return;
    }
    // setIsOpenCard(false);
    // setShowTrueButton(false);
  }, [word]);

  const handleResult = (result: boolean) => {
    setIsOpenCard(true);
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
              onClick={handleClickVariant}
            />
          </Grid>
          <Grid item container justify='center'>
            <Button
              className={classes.button}
              variant='contained'
              onClick={handleClickNext}
            >
              {isOpenCard ? <ArrowRightAltIcon /> : 'Не знаю'}
            </Button>
          </Grid>
        </Grid>
      </Slide>
    </div>
  );
}
