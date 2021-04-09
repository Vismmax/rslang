import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {
  countGames,
  countWords,
  percentTrueWords,
  seriesWords,
} from './statisticsHelpers';
import { IStatisticsGame } from './statisticsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(3),
    },
    title: {
      marginBottom: theme.spacing(3),
    },
  }),
);

interface Props {
  gameId?: string;
  gameName?: string;
  games: IStatisticsGame[];
  paper?: boolean;
}

export default function StatisticsGame({
  gameId,
  gameName,
  games,
  paper = true,
}: Props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={paper ? 3 : 0}>
      <Grid container direction='column' spacing={1}>
        {gameId && (
          <Grid item>
            <Typography className={classes.title} variant='h6' component='h3'>
              {gameName}
            </Typography>
          </Grid>
        )}
        <Grid item container justify='space-between' wrap='nowrap' spacing={1}>
          <Grid item>
            <Typography variant='body1' component='div'>
              Количество сыгранных игр:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1' component='div'>
              {countGames(games, gameId)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justify='space-between' wrap='nowrap' spacing={1}>
          <Grid item>
            <Typography variant='body1' component='div'>
              Количество изученных слов:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1' component='div'>
              {countWords(games, gameId)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justify='space-between' wrap='nowrap' spacing={1}>
          <Grid item>
            <Typography variant='body1' component='div'>
              Процент правильных ответов:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1' component='div'>
              {percentTrueWords(games, gameId)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justify='space-between' wrap='nowrap' spacing={1}>
          <Grid item>
            <Typography variant='body1' component='div'>
              Самая длинная серия правильных ответов:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1' component='div'>
              {seriesWords(games, gameId)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
