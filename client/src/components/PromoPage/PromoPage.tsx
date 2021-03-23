import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import WrapMain from '../WrapMain/WrapMain';

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

export default function PromoPage() {
  const classes = useStyles();

  return (
    <WrapMain>
      <div></div>
    </WrapMain>
  );
}
