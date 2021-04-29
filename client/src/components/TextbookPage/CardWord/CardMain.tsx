import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import useSound from 'use-sound';

import { IExtWord } from '../../../common/interfaces/WordInterfaces';
import {
  settingsSoundOn,
  settingsTextbook,
} from '../../SettingsPage/settingsSlice';
import { showNotificationWarning } from '../../common/Notification/notificationSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    wrapImage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paperImage: {
      borderRadius: '50%',
    },
    image: {
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    word: {},
    transcription: {
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightLight,
    },
    meaning: {
      marginBottom: theme.spacing(1),
    },
    line: {
      display: 'flex',
      flexWrap: 'nowrap',
    },
  }),
);

interface Props {
  word: IExtWord;
}

export default function CardMain({ word }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const settings = useSelector(settingsTextbook);
  const soundOn = useSelector(settingsSoundOn);

  const [timerId, setTimerId] = useState<number>();

  const [speakExample, { duration: durationExample }] = useSound(
    word.audioExample,
  );
  const [speakMeaning, { duration: durationMeaning }] = useSound(
    word.audioMeaning,
  );
  const [speakWord, { duration: durationWord }] = useSound(word.audio);

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const handleClickSpeak = () => {
    if (!durationWord || !durationMeaning || !durationExample) {
      dispatch(showNotificationWarning('Не все звуковые файлы загружены'));
    }
    speakWord();
    if (durationWord) {
      const timeout = window.setTimeout(() => {
        speakMeaning();
        if (durationMeaning) {
          const timeout = window.setTimeout(() => {
            speakExample();
          }, durationMeaning + 300);
          setTimerId(timeout);
        }
      }, durationWord + 300);
      setTimerId(timeout);
    }
  };

  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid className={classes.wrapImage} item>
        <Paper className={classes.paperImage} elevation={3}>
          <Avatar className={classes.image} alt={word.word} src={word.image} />
        </Paper>
      </Grid>
      <Grid item>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <Typography
              className={classes.word}
              color='secondary'
              variant='h6'
              component='span'
            >
              {word.word}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.transcription} component='span'>
              {word.transcription}
            </Typography>
          </Grid>
          {settings.showTranslate && (
            <Grid item>
              <Typography>{word.wordTranslate}</Typography>
            </Grid>
          )}
          <Grid item>
            <IconButton aria-label='speak' onClick={handleClickSpeak}>
              <VolumeUpIcon />
            </IconButton>
          </Grid>
        </Grid>

        <div className={classes.meaning}>
          <Typography dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
          {settings.showTranslate && (
            <Typography>{word.textMeaningTranslate}</Typography>
          )}
        </div>

        <div>
          <div className={classes.line}>
            <ArrowRightAltIcon />
            <Typography
              dangerouslySetInnerHTML={{ __html: word.textExample }}
            />
          </div>
          {settings.showTranslate && (
            <div className={classes.line}>
              <ArrowRightAltIcon />
              <Typography>{word.textExampleTranslate}</Typography>
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
