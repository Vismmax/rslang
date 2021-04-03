import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import GameLayout from '../GameLayout/GameLayout';
import SavannahGame from './SavannahGame';
import { useSelector } from 'react-redux';
import { isLoadingSavannah } from './savannahSlice';
import Spinner from '../../common/Spinner';
import { isStartGame } from '../gameSlice';
import SavannahInit from './SavannahInit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    background: {
      backgroundImage: 'url("/img/savannah.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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
