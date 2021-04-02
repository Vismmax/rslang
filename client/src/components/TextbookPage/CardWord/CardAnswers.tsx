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
import CardMain from './CardMain';
import CardBadge from './CardBadge';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

interface Props {
  optional: {
    correctCount: number;
    errorCount: number;
  };
}

export default function CardAnswers({ optional }: Props) {
  const classes = useStyles();

  return (
    <Grid item>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant='body2'>
            Правильных ответов: {optional.correctCount}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body2'>
            Не правильных ответов: {optional.errorCount}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
