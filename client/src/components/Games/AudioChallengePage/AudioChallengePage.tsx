import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import GameLayout from '../GameLayout/GameLayout';
import Spinner from '../../common/Spinner';
import AudioChallengeInit from '../AudioChallengePage/AudioChallengeInit';
import { isStartGame } from '../gameSlice';
import { isLoadingAudioChallenge } from './audioChallengeSlice';
import AudioChallengeGame from './AudioChallengeGame';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      // backgroundImage: 'url("/img/bg.jpg")',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
    },
  }),
);

export default function AudioChallengePage() {
  const classes = useStyles();
  const isLoading = useSelector(isLoadingAudioChallenge);
  const isStart = useSelector(isStartGame);

  return (
    <GameLayout>
      <AudioChallengeInit>
        {isStart && !isLoading && <AudioChallengeGame />}
        {isStart && isLoading && <Spinner />}
      </AudioChallengeInit>
    </GameLayout>
  );
}
