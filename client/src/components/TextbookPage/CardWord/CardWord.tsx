import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { IExtWord, IWord } from '../../../common/interfaces/WordInterfaces';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import { settingsTextbook } from '../../SettingsPage/settingsSlice';
import { showNotificationWarning } from '../../common/Notification/notificationSlice';
import Badge from '@material-ui/core/Badge';
import { userStore } from '../../LoginPage/userSlice';
import { fetchWordSetDifficulty, idLoadingWord } from '../textbookSlice';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1),
      },
    },
    hard: {
      boxShadow:
        '0px 3px 5px -1px rgb(255 0 0 / 20%), 0px 5px 8px 0px rgb(255 0 0 / 14%), 0px 1px 14px 0px rgb(255 0 0 / 12%)',
    },
    badge: {
      position: 'absolute',
      right: theme.spacing(4.5),
      top: theme.spacing(2),
    },
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
    word: {
      // fontWeight: theme.typography.fontWeightBold,
    },
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
    buttonRelative: {
      position: 'relative',
    },
    buttonProgress: {
      // color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

interface Props {
  word: IExtWord;
}

export default function CardWord({ word }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(userStore);
  const settings = useSelector(settingsTextbook);
  const idLoading = useSelector(idLoadingWord);

  const [timerId, setTimerId] = useState<number>();
  const hard = word.userWord.difficulty === 'hard';
  const classHard = hard ? ` ${classes.hard}` : '';

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

  const handleClickHard = () => {
    console.log('word.userWord.difficulty: ', word.userWord.difficulty);
    if (word.userWord.difficulty === 'hard') {
      dispatch(fetchWordSetDifficulty({ id: word.id, difficulty: 'work' }));
    } else {
      dispatch(fetchWordSetDifficulty({ id: word.id, difficulty: 'hard' }));
    }
  };

  const handleClickDelete = () => {
    dispatch(fetchWordSetDifficulty({ id: word.id, difficulty: 'delete' }));
  };

  return (
    <Paper
      elevation={3}
      className={classes.root + classHard}
      // className={classes.root + ' ' + hard ? classes.hard : ''}
    >
      <Grid container spacing={3}>
        <Grid className={classes.wrapImage} item>
          <Paper className={classes.paperImage} elevation={3}>
            <Avatar
              className={classes.image}
              alt={word.word}
              src={word.image}
            />
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
            <Typography
              dangerouslySetInnerHTML={{ __html: word.textMeaning }}
            />
            {settings.showTranslate && (
              <Typography>{word.textMeaningTranslate}</Typography>
            )}
          </div>

          <div>
            <div className={classes.line}>
              <ArrowRightAltIcon />
              <Typography
                // component='span'
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
      <Grid container spacing={3} justify='flex-end' alignItems='center'>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body2'>
                Правильных ответов: {word.userWord.optional.correctCount}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2'>
                Не правильных ответов: {word.userWord.optional.errorCount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {settings.showButtons && (
          <Grid item>
            <ButtonGroup variant='contained' size='small'>
              <Button
                className={classes.buttonRelative}
                disabled={!user.userId || idLoading === word.id}
                color={hard ? 'default' : 'primary'}
                onClick={handleClickHard}
              >
                {hard ? 'Простое' : 'Сложное'}
                {idLoading === word.id && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Button>
              <Button
                disabled={!user.userId || idLoading === word.id}
                color='secondary'
                onClick={handleClickDelete}
              >
                Удалить
              </Button>
            </ButtonGroup>
          </Grid>
        )}
      </Grid>
      {hard && (
        <Badge
          className={classes.badge}
          badgeContent='Сложное'
          color='secondary'
        />
      )}
    </Paper>
  );
}
