import React, { useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import format from 'date-fns/format';
import { ru } from 'date-fns/locale';
import { IStatisticsGame } from './statisticsSlice';
import { IDataChartItem } from './statisticsHelpers';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: '100%',
      padding: theme.spacing(1),
    },
  }),
);

const dateFormatter = (date: number) => {
  return format(new Date(date), 'd MMMM yyyy', { locale: ru });
};

interface Props {
  dataKey: 'countWords' | 'totalWords' | 'countGames' | 'percentTrueWords';
  active?: boolean;
  payload?: { payload: IDataChartItem }[];
}

export default function StatisticsTooltip({ dataKey, active, payload }: Props) {
  const classes = useStyles();

  if (active) {
    const currData = payload && payload.length ? payload[0].payload : null;
    return (
      <Paper className={classes.root}>
        <Typography variant='subtitle1' component='div'>
          {currData ? dateFormatter(currData.date) : ' -- '}
        </Typography>
        <Typography variant='body2' component='div'>
          {'Выучено слов: '}
          <Typography variant='subtitle1' component='span'>
            {currData ? currData[dataKey] : ' -- '}
          </Typography>
        </Typography>
        {dataKey !== 'totalWords' && (
          <Typography variant='body2' component='div'>
            {'Сыграно игр: '}
            <Typography variant='subtitle1' component='span'>
              {currData ? currData.countGames : ' -- '}
            </Typography>
          </Typography>
        )}
      </Paper>
    );
  }

  return null;
}
