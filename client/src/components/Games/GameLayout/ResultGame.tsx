import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import BarChartIcon from '@material-ui/icons/BarChart';
import useSound from 'use-sound';

import { IWord } from '../../../common/interfaces/WordInterfaces';
import ResultItem from './ResultItem';
import { fetchWordSetDifficulty, levelGame, resultGame } from '../gameSlice';
import endSfx from '../../../assets/end.mp3';
import { settingsSoundOn } from '../../SettingsPage/settingsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    paper: {
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(0.5),
      },
    },
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: '60vh',
      [theme.breakpoints.down('xs')]: {
        maxHeight: '50vh',
      },
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(4),
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    labelTrue: {
      marginLeft: theme.spacing(2),
      padding: theme.spacing(0.25, 1),
      borderRadius: 8,
      color: theme.palette.background.paper,
      backgroundColor: theme.palette.primary.main,
    },
    labelFalse: {
      marginLeft: theme.spacing(2),
      padding: theme.spacing(0.25, 1),
      borderRadius: 8,
      color: theme.palette.background.paper,
      backgroundColor: theme.palette.error.main,
    },
  }),
);

interface Props {
  open: boolean;
  onCancel: () => void;
  onReset: () => void;
}

export default function ResultGame({ open, onCancel, onReset }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { score, experience, wordsTrue, wordsFalse } = useSelector(resultGame);
  const level = useSelector(levelGame);
  const soundOn = useSelector(settingsSoundOn);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [endSound] = useSound(endSfx, { soundEnabled: soundOn });

  useEffect(() => {
    if (open) endSound();
  }, [open]);

  const handleStart = () => {
    onReset();
  };

  const handleClose = () => {
    onCancel();
  };

  const handleAddWord = (word: IWord) => {
    dispatch(fetchWordSetDifficulty({ word, difficulty: 'hard' }));
  };

  const handleDeleteWord = (word: IWord) => {
    dispatch(fetchWordSetDifficulty({ word, difficulty: 'delete' }));
  };

  return (
    <Dialog
      className={classes.root}
      classes={{ paper: classes.paper }}
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby='result-dialog-title'
      aria-describedby='result-dialog-description'
    >
      <DialogTitle id='settings-dialog-title'>
        <Grid container justify='space-between' spacing={3}>
          <Grid item>
            <Typography variant='h6'>Набрано {score} очков.</Typography>
          </Grid>
          <Grid item>
            <BarChartIcon />
          </Grid>
          <Grid item>
            <Typography variant='h6'>Получено +{experience} опыта.</Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <List className={classes.list} subheader={<li />}>
          <li className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>
                <Typography variant='subtitle1' component='span'>
                  Слова с ошибками
                </Typography>
                <Typography
                  className={classes.labelFalse}
                  variant='subtitle1'
                  component='span'
                >
                  {wordsFalse.length}
                </Typography>
              </ListSubheader>
              {wordsFalse.map((word) => (
                <ResultItem
                  word={word}
                  result={false}
                  level={level}
                  onClick={handleAddWord}
                />
              ))}
            </ul>
          </li>
          <li className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>
                <Typography variant='subtitle1' component='span'>
                  Изученные слова
                </Typography>
                <Typography
                  className={classes.labelTrue}
                  variant='subtitle1'
                  component='span'
                >
                  {wordsTrue.length}
                </Typography>
              </ListSubheader>
              {wordsTrue.map((word) => (
                <ResultItem
                  word={word}
                  result={true}
                  level={level}
                  onClick={handleDeleteWord}
                />
              ))}
            </ul>
          </li>
        </List>

        <div className={classes.buttons}>
          <Button variant='contained' onClick={handleClose}>
            Закончить игру
          </Button>
          <Button variant='contained' onClick={handleStart} color='primary'>
            Еще раз
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
