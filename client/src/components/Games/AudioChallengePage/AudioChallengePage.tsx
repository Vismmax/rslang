import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import GameLayout from '../GameLayout/GameLayout';
import Spinner from '../../common/Spinner';
import AudioChallengeInit from '../AudioChallengePage/AudioChallengeInit';
import AudioChallengeGame from './AudioChallengeGame';
import { isStartGame } from '../gameSlice';
import { isLoadingAudioChallenge } from './audioChallengeSlice';
import routesData from '../../Routes/routesData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    background: {
      backgroundColor: theme.palette.info.light,
      backgroundImage: `url(${routesData.audioChallenge.image})`,
    },
  }),
);

export default function AudioChallengePage() {
  const classes = useStyles();
  const isLoading = useSelector(isLoadingAudioChallenge);
  const isStart = useSelector(isStartGame);

  return (
    <GameLayout className={classes.background}>
      <AudioChallengeInit>
        {isStart && !isLoading && <AudioChallengeGame />}
        {isStart && isLoading && <Spinner />}
      </AudioChallengeInit>
    </GameLayout>
  );
}
