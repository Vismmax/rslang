import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PageLayout from '../PageLayout/PageLayout';
import ContainerMain from '../PageLayout/ContainerMain';
import StatisticsTabs from './StatisticsTabs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

export default function StatisticsPage() {
  const classes = useStyles();

  return (
    <PageLayout>
      <ContainerMain>
        <StatisticsTabs />
      </ContainerMain>
    </PageLayout>
  );
}
