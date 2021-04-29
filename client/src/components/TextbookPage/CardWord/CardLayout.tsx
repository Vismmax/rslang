import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { IExtWord } from '../../../common/interfaces/WordInterfaces';
import CardMain from './CardMain';
import CardBadge from './CardBadge';
import CardAnswers from './CardAnswers';
import { settingsTextbook } from '../../SettingsPage/settingsSlice';

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
  }),
);

interface Props {
  className?: string;
  word: IExtWord;
  buttons: JSX.Element | null;
}

export default function CardLayout({ word, buttons, className = '' }: Props) {
  const classes = useStyles();
  const settings = useSelector(settingsTextbook);

  const hard = word.userWord.difficulty === 'hard';
  const classHard = hard ? ` ${classes.hard}` : '';

  return (
    <Paper elevation={3} className={classes.root + ` ${className}` + classHard}>
      <CardMain word={word} />
      <Grid container spacing={3} justify='flex-end' alignItems='center'>
        <CardAnswers optional={word.userWord.optional} />
        {settings.showButtons && buttons}
      </Grid>
      {hard && <CardBadge />}
    </Paper>
  );
}
