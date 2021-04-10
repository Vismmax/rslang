import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PageLayout from '../PageLayout/PageLayout';
import ContainerMain from '../PageLayout/ContainerMain';
import StatisticsTabs from './StatisticsTabs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    background: {
      backgroundImage: 'url("/img/statistics.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  }),
);

export default function StatisticsPage() {
  const classes = useStyles();

  return (
    <PageLayout background={classes.background}>
      {/*<ContainerMain>*/}
      <StatisticsTabs />
      {/*</ContainerMain>*/}
    </PageLayout>
  );
}
