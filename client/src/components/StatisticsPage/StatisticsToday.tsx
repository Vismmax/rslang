import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import StatisticsGame from './StatisticsGame';
import { statisticsToday } from './statisticsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    header: {
      marginBottom: theme.spacing(3),
    },
    paper: {
      marginBottom: theme.spacing(5),
      padding: theme.spacing(1, 0),
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
  }),
);

export default function StatisticsToday() {
  const classes = useStyles();
  const games = useSelector(statisticsToday);

  return (
    <div className={classes.root}>
      <Typography className={classes.header} variant='h4' component='h1'>
        Статистика
      </Typography>

      <Typography className={classes.header} variant='h5' component='h2'>
        Общая статистика за день
      </Typography>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={10}>
          <Grid item container xs={12} md={6}>
            <StatisticsGame games={games} paper={false} />
          </Grid>
        </Grid>
      </Paper>

      <Typography className={classes.header} variant='h5' component='h2'>
        Статистика по играм
      </Typography>
      <Grid container spacing={10}>
        <Grid item container xs={12} md={6}>
          <StatisticsGame games={games} gameId='savannah' gameName='Саванна' />
        </Grid>
        <Grid item container xs={12} md={6}>
          <StatisticsGame
            games={games}
            gameId='audioChallenge'
            gameName='Аудиовызов'
          />
        </Grid>
        <Grid item container xs={12} md={6}>
          <StatisticsGame games={games} gameId='sprint' gameName='Спринт' />
        </Grid>
        <Grid item container xs={12} md={6}>
          <StatisticsGame
            games={games}
            gameId='designer'
            gameName='Конструктор'
          />
        </Grid>
      </Grid>
    </div>
  );
}
