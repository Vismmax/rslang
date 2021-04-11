import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import GameLayout from '../GameLayout/GameLayout';
import Spinner from '../../common/Spinner';
import DesignerInit from './DesignerInit';
import DesignerGame from './DesignerGame';
import { isStartGame } from '../gameSlice';
import { isLoadingDesigner } from './designerSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    background: {
      backgroundImage: 'url("/img/designer.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  }),
);

export default function DesignerPage() {
  const classes = useStyles();
  const isLoading = useSelector(isLoadingDesigner);
  const isStart = useSelector(isStartGame);

  return (
    <GameLayout className={classes.background}>
      <DesignerInit>
        {isStart && !isLoading && <DesignerGame />}
        {isStart && isLoading && <Spinner />}
      </DesignerInit>
    </GameLayout>
  );
}
