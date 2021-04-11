import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import GameLayout from '../GameLayout/GameLayout';
import SavannahGame from './SavannahGame';
import Spinner from '../../common/Spinner';
import SavannahInit from './SavannahInit';
import { isStartGame } from '../gameSlice';
import { isLoadingSavannah } from './savannahSlice';
import routesData from '../../Routes/routesData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    background: {
      backgroundImage: `url(${routesData.savannah.image})`,
    },
  }),
);

export default function SavannahPage() {
  const classes = useStyles();
  const isLoading = useSelector(isLoadingSavannah);
  const isStart = useSelector(isStartGame);

  return (
    <GameLayout className={classes.background}>
      <SavannahInit>
        {isStart && !isLoading && <SavannahGame />}
        {isStart && isLoading && <Spinner />}
      </SavannahInit>
    </GameLayout>
  );
}
