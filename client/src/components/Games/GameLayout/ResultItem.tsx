import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import useSound from 'use-sound';

import { IWord } from '../../../common/interfaces/WordInterfaces';
import { useSelector } from 'react-redux';
import { settingsSoundOn } from '../../SettingsPage/settingsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingRight: theme.spacing(16),
      [theme.breakpoints.down('xs')]: {
        paddingRight: theme.spacing(8),
      },
    },
  }),
);

interface Props {
  word: IWord;
  result: boolean;
  level: number | null;
  onClick: (word: IWord) => void;
}

export default function ResultItem({ word, result, onClick, level }: Props) {
  const classes = useStyles();
  const soundOn = useSelector(settingsSoundOn);

  const [speak] = useSound(word.audio, { soundEnabled: soundOn });

  const [disable, setDisable] = useState(false);

  const handleSpeak = () => {
    speak();
  };

  const handleClick = () => {
    setDisable(true);
    onClick(word);
  };

  return (
    <ListItem className={classes.root}>
      <ListItemIcon>
        <IconButton onClick={handleSpeak}>
          <VolumeUpIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemText
        primary={
          <>
            <Grid
              container
              justify='flex-start'
              alignItems='baseline'
              spacing={1}
            >
              <Grid item>
                <Typography variant='h6' component='span'>
                  {word.word}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  component='span'
                >
                  {word.transcription}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body1' component='span'>
                  -
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body1' component='span'>
                  {word.wordTranslate}
                </Typography>
              </Grid>
            </Grid>
          </>
        }
      />
      {level === null && (
        <ListItemSecondaryAction>
          {result ? (
            <Tooltip title='Переместить слово в удаленные'>
              <IconButton disabled={disable} onClick={handleClick}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title='Добавить слово в сложные'>
              <IconButton disabled={disable} onClick={handleClick}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}
