import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';

import { learnedWordsStatistics } from '../StatisticsPage/statisticsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    bar: {
      height: theme.spacing(1),
    },
  }),
);

const countWords = 3600;

export default function HomeProgress() {
  const classes = useStyles();
  const count = useSelector(learnedWordsStatistics);

  return (
    <Paper className={classes.root} elevation={3}>
      <Grid container justify='center' spacing={3}>
        <Grid item>
          <Typography variant='h6' component='h2'>
            Изучено слов:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container alignItems='center' wrap='nowrap' spacing={1}>
            <Grid item>
              <Typography variant='h6' component='h2'>
                {count}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <LinearProgress
                classes={{ root: classes.bar }}
                variant='determinate'
                value={(count * 100) / countWords}
              />
            </Grid>
            <Grid item>
              <Typography variant='h6' component='h2'>
                {countWords}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
