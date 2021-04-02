import React from 'react';
import { useSelector } from 'react-redux';
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
  allWordsAudioChallenge,
  isLoadingAudioChallenge,
} from './audioChallengeSlice';
import Grid from '@material-ui/core/Grid';
import AudioChallengeCard from './AudioChallengeCard';
import ButtonsWords from '../common/ButtonsWords';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      height: '100%',
      flexGrow: 1,
      padding: theme.spacing(3),
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
  const www = useSelector(allWordsAudioChallenge);

  return (
    <div className={classes.root}>
      <Grid container direction='column' justify='center'>
        <Grid item container direction='column'>
          <Grid className={classes.card}>
            <AudioChallengeCard isOpen={true} word={www[0]} />
          </Grid>
        </Grid>
        <Grid className={classes.space} item>
          <ButtonsWords
            words={[www[0], www[1], www[2], www[3]]}
            trueWord={www[0]}
            onClick={() => {}}
          />
        </Grid>
        <Grid item container justify='center'>
          <Button className={classes.button} variant='contained'>
            Не знаю
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
