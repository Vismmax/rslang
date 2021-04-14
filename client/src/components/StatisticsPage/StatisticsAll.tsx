import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  LineChart,
  AreaChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import format from 'date-fns/format';
import { ru } from 'date-fns/locale';

import StatisticsTooltip from './StatisticsTooltip';
import { getDataChart } from './statisticsHelpers';
import { statisticsAllDays } from './statisticsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(3),
    },
    header: {
      marginBottom: theme.spacing(3),
    },
    chart: {
      marginLeft: -theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  }),
);

const dateFormatter = (date: number) => {
  return format(new Date(date), 'dd/MMM', { locale: ru });
};

export default function StatisticsAll() {
  const classes = useStyles();
  const theme = useTheme();
  const games = useSelector(statisticsAllDays);
  const [data, setData] = useState(getDataChart(games));

  return games.length ? (
    <div className={classes.root}>
      <Typography className={classes.header} variant='h4' component='h1'>
        Статистика за весь период обучения
      </Typography>

      <Typography className={classes.header} variant='h5' component='h2'>
        Количество изученных слов за каждый день изучения.
      </Typography>
      <div className={classes.chart}>
        <ResponsiveContainer width='100%' height={theme.spacing(50)}>
          <LineChart width={300} height={100} data={data}>
            <XAxis dataKey='date' tickFormatter={dateFormatter} />
            <YAxis />
            <Tooltip content={<StatisticsTooltip dataKey='countWords' />} />
            <Legend
              formatter={() => (
                <Typography variant='subtitle2' component='span'>
                  Количество изученных слов
                </Typography>
              )}
            />
            <Line
              type='monotone'
              dataKey='countWords'
              stroke={theme.palette.primary.main}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Typography className={classes.header} variant='h5' component='h2'>
        Увеличение общего количества изученных слов за весь период изучения по
        дням.
      </Typography>
      <div className={classes.chart}>
        <ResponsiveContainer width='100%' height={theme.spacing(50)}>
          <AreaChart width={300} height={100} data={data}>
            <XAxis dataKey='date' tickFormatter={dateFormatter} />
            <YAxis />
            <Tooltip content={<StatisticsTooltip dataKey='totalWords' />} />
            <Legend
              formatter={() => (
                <Typography variant='subtitle2' component='span'>
                  Количество изученных слов
                </Typography>
              )}
            />
            <Area
              type='monotone'
              dataKey='totalWords'
              stroke={theme.palette.warning.main}
              fill={theme.palette.warning.light}
              strokeWidth={2}
              fillOpacity={0.7}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  ) : null;
}
