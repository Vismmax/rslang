import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import useSound from 'use-sound';

import { IWord } from '../../../common/interfaces/WordInterfaces';
import CardWord from '../common/CardWord';
import { settingsAudioChallenge } from '../../SettingsPage/settingsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    button: {
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    icon: {
      fontSize: theme.spacing(10),
    },
  }),
);

interface Props {
  isOpen: boolean;
  word: IWord;
}

export default function AudioChallengeCard({ isOpen, word }: Props) {
  const classes = useStyles();
  const settings = useSelector(settingsAudioChallenge);

  // @ts-ignore
  const [speak] = useSound(word.audio, { autoplay: true });

  const handleSpeak = () => {
    speak();
  };

  return (
    <CardWord
      isOpen={isOpen}
      word={word}
      showTranslate={settings.showTranslate}
      questionContent={
        <Fab className={classes.button} onClick={handleSpeak}>
          <VolumeUpIcon className={classes.icon} color='primary' />
        </Fab>
      }
    />
  );
}
