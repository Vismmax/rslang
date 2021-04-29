import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ReactCardFlip from 'react-card-flip';
import useSound from 'use-sound';

import { IWord } from '../../../common/interfaces/WordInterfaces';
import { useSelector } from 'react-redux';
import { settingsSoundOn } from '../../SettingsPage/settingsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    card: {
      width: theme.spacing(34),
      height: theme.spacing(36),
      padding: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
        minWidth: theme.spacing(36),
      },
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(34),
        height: theme.spacing(28),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
    },
    cardQuestion: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardAnswer: {},
    image: {
      width: theme.spacing(16),
      height: theme.spacing(16),
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(12),
        height: theme.spacing(12),
      },
    },
  }),
);

interface Props {
  isOpen: boolean;
  word: IWord;
  questionContent: JSX.Element;
  showTranslate?: boolean;
  paper?: boolean;
}

export default function CardWord({
  isOpen,
  word,
  questionContent,
  showTranslate = true,
  paper = false,
}: Props) {
  const classes = useStyles();
  const soundOn = useSelector(settingsSoundOn);

  const [speak] = useSound(word.audio, { soundEnabled: soundOn });

  const handleSpeak = () => {
    speak();
  };

  return (
    <div className={classes.root}>
      <ReactCardFlip isFlipped={isOpen} flipDirection='horizontal'>
        {paper ? (
          <Paper
            className={`${classes.card} ${classes.cardQuestion}`}
            elevation={3}
          >
            {questionContent}
          </Paper>
        ) : (
          <div className={`${classes.card} ${classes.cardQuestion}`}>
            {questionContent}
          </div>
        )}

        <Paper
          className={`${classes.card} ${classes.cardAnswer}`}
          elevation={3}
        >
          {isOpen && (
            <Grid container direction='column' spacing={3}>
              <Grid item container justify='center' alignItems='center'>
                <Avatar
                  className={classes.image}
                  alt={word.word}
                  src={word.image}
                />
              </Grid>
              <Grid
                item
                container
                wrap='nowrap'
                alignItems='stretch'
                spacing={2}
              >
                <Grid item justify='center' alignItems='center'>
                  <Fab aria-label='speak' onClick={handleSpeak}>
                    <VolumeUpIcon />
                  </Fab>
                </Grid>
                <Grid
                  item
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                >
                  <Grid item container justify='center' alignItems='center'>
                    <Typography variant='h5'>{word.word}</Typography>
                  </Grid>
                  {showTranslate && (
                    <>
                      <Grid item container justify='center' alignItems='center'>
                        <Typography variant='subtitle1'>
                          {word.transcription}
                        </Typography>
                      </Grid>
                      <Grid item container justify='center' alignItems='center'>
                        <Typography variant='h6'>
                          {word.wordTranslate}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Paper>
      </ReactCardFlip>
    </div>
  );
}
