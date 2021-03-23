import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import WrapGame from '../WrapGame/WrapGame';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      // backgroundImage: 'url("/img/bg.jpg")',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
    },
  }),
);

export default function SprintPage() {
  const classes = useStyles();

  return (
    <WrapGame>
      <div></div>
    </WrapGame>
  );
}
