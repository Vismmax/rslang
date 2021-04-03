import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import GameLayout from '../GameLayout/GameLayout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      // backgroundImage: 'url("/img/bg.jpg")',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
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

  return (
    <GameLayout className={classes.background}>
      <div></div>
    </GameLayout>
  );
}
