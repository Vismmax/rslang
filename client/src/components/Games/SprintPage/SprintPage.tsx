import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import GameLayout from '../GameLayout/GameLayout';
import Spinner from '../../common/Spinner';
import SprintInit from './SprintInit';
import SprintGame from './SprintGame';
import { isStartGame } from '../gameSlice';
import { isLoadingSprint } from './sprintSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    background: {
      backgroundImage: 'url("/img/sprint.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  }),
);

export default function SprintPage() {
  const classes = useStyles();
  const isLoading = useSelector(isLoadingSprint);
  const isStart = useSelector(isStartGame);

  return (
    <GameLayout className={classes.background}>
      <SprintInit>
        {isStart && !isLoading && <SprintGame />}
        {isStart && isLoading && <Spinner />}
      </SprintInit>
    </GameLayout>
  );
}
