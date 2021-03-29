import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import GameLayout from '../GameLayout/GameLayout';
import SavannahGame from './SavannahGame';
import { useSelector } from 'react-redux';
import { isLoadingSavannah } from './savannahSlice';
import Spinner from '../../common/Spinner';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    background: {
      backgroundImage: 'url("/img/g1.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  }),
);

export default function SavannahPage() {
  const classes = useStyles();
  const isLoading = useSelector(isLoadingSavannah);

  return (
    <GameLayout className={classes.background}>
      {isLoading && <Spinner />}
      <SavannahGame />
    </GameLayout>
  );
}
