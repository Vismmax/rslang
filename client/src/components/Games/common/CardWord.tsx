import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { IWord } from '../../../common/interfaces/WordInterfaces';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import useSound from 'use-sound';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // position: 'absolute',
      // left: '50%',
      // top: '50%',
      // transform: 'translate(-50%,-50%)',
      // margin: 'auto',
    },
    card: {
      width: theme.spacing(34),
      height: theme.spacing(36),
      padding: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
        minWidth: theme.spacing(36),
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
    },
  }),
);

interface Props {
  isOpen: boolean;
  word: IWord;
}

export default function CardWord({ isOpen, word }: Props) {
  const classes = useStyles();

  const [speak] = useSound(word.audio);

  const handleSpeak = () => {
    speak();
  };

  return (
    <div className={classes.root}>
      <ReactCardFlip isFlipped={isOpen} flipDirection='horizontal'>
        <Paper
          className={`${classes.card} ${classes.cardQuestion}`}
          elevation={3}
        >
          <Typography variant='h3'>{word.word}</Typography>
        </Paper>

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
                  // spacing={1}
                  justify='center'
                  alignItems='center'
                >
                  <Grid item container justify='center' alignItems='center'>
                    <Typography variant='h5'>{word.word}</Typography>
                  </Grid>
                  <Grid item container justify='center' alignItems='center'>
                    <Typography variant='subtitle1'>
                      {word.transcription}
                    </Typography>
                  </Grid>
                  <Grid item container justify='center' alignItems='center'>
                    <Typography variant='h6'>{word.wordTranslate}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}

          {/*<div></div>*/}
        </Paper>
      </ReactCardFlip>
    </div>
  );
}
