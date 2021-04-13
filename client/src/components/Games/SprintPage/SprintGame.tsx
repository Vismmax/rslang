import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useSound from 'use-sound';

import SprintCard from './SprintCard';
import { SprintProgress } from './SprintProgress';
import { settingsSprint } from '../../SettingsPage/settingsSlice';
import { addAnswerGame, scoreGame, stopGame } from '../gameSlice';
import {
  activeVariantSprint,
  activeWordSprint,
  nextWordSprint,
} from './sprintSlice';
import trueSfx from '../../../assets/true.mp3';
import falseSfx from '../../../assets/false.mp3';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: theme.spacing(8),
      paddingTop: theme.spacing(8),
    },

    card: {
      maxWidth: theme.spacing(40),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    space: {
      marginTop: theme.spacing(1),
    },
    button: {
      width: theme.spacing(20),
      opacity: 0.8,
    },
  }),
);

export const seriesValues = [10, 20, 40, 80];

export default function SprintGame() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const word = useSelector(activeWordSprint);
  const variant = useSelector(activeVariantSprint);
  const settings = useSelector(settingsSprint);

  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);

  const { episode, series, score } = useSelector(scoreGame);

  const [trueSound] = useSound(trueSfx);
  const [falseSound] = useSound(falseSfx);

  useEffect(() => {
    dispatch(nextWordSprint());
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime + 1 === settings.timeGame) {
          clearInterval(interval);
          finishGame();
          return 0;
        }
        return prevTime + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
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

    dispatch(addAnswerGame({ word, result }));
    fetchNewWord();
  };

  const fetchNewWord = () => {
    dispatch(nextWordSprint());
  };

  const handleClickVariant = (isTrue: boolean) => {
    handleResult(isTrue);
  };

  const finishGame = () => {
    setStart(false);
    dispatch(stopGame('sprint'));
    console.log('finish');
  };

  return (
    <div className={classes.root}>
      <Grid container direction='column' justify='center'>
        <Grid item container>
          <Grid item container justify='center' xs={false} sm={3}></Grid>
          <Grid
            item
            container
            justify='center'
            alignItems='center'
            xs={6}
            sm={6}
          >
            <Typography variant='h3' color='secondary'>
              {score}
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify='center'
            alignItems='center'
            xs={6}
            sm={3}
          >
            <SprintProgress timeGame={settings.timeGame} time={time} />
          </Grid>
        </Grid>
        <Grid className={classes.space} item container justify='center'>
          <SprintCard
            word={word}
            variant={variant}
            episode={episode}
            series={series}
            showImage={settings.showHelp}
            langEn={settings.langWordEn}
            onResult={handleClickVariant}
          />
        </Grid>
      </Grid>
    </div>
  );
}
