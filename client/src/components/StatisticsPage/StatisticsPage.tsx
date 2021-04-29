import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import PageLayout from '../PageLayout/PageLayout';
import StatisticsTabs from './StatisticsTabs';
import routesData from '../Routes/routesData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    background: {
      backgroundColor: theme.palette.info.light,
      backgroundImage: `url(${routesData.statistics.background})`,
    },
  }),
);

export default function StatisticsPage() {
  const classes = useStyles();

  return (
    <PageLayout background={classes.background}>
      <StatisticsTabs />
    </PageLayout>
  );
}
