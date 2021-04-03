import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardWord from '../common/CardWord';
import { IWord } from '../../../common/interfaces/WordInterfaces';
import { settingsAudioChallenge } from '../../SettingsPage/settingsSlice';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import Fab from '@material-ui/core/Fab';
import useSound from 'use-sound';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      // width: '100%',
      // height: '100%',
    },
    button: {
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    icon: {
      fontSize: theme.spacing(10),
      // color: theme.palette.text.secondary,
    },
  }),
);

interface Props {
  isOpen: boolean;
  word: IWord;
}

export default function AudioChallengeCard({ isOpen, word }: Props) {
  const classes = useStyles();
  const showTranslate = useSelector(settingsAudioChallenge);

  // @ts-ignore
  const [speak] = useSound(word.audio, { autoplay: true });

  const handleSpeak = () => {
    speak();
  };

  return (
    <CardWord
      isOpen={isOpen}
      word={word}
      showTranslate={showTranslate.showTranslate}
      questionContent={
        // <div className={classes.root}>
        <Fab className={classes.button} onClick={handleSpeak}>
          <VolumeUpIcon className={classes.icon} color='primary' />
        </Fab>
        // </div>
      }
    />
  );
}
