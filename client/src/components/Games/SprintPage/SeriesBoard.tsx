import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { IWord } from '../../../common/interfaces/WordInterfaces';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import FlightIcon from '@material-ui/icons/Flight';
import { orange, red, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    hidden: {
      display: 'none',
    },
  }),
);

interface Props {
  series: number;
}

export default function SeriesBoard({ series }: Props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid item container justify='center' spacing={2}>
      <Grid item>
        <DirectionsRunIcon fontSize='large' color='action' />
      </Grid>
      <Grid item>
        <DirectionsBikeIcon
          className={clsx(series < 1 && classes.hidden)}
          fontSize='large'
          style={{ color: yellow['A700'] }}
        />
      </Grid>
      <Grid item>
        <DirectionsCarIcon
          className={clsx(series < 2 && classes.hidden)}
          fontSize='large'
          style={{ color: theme.palette.warning.main }}
        />
      </Grid>
      <Grid item>
        <FlightIcon
          className={clsx(series < 3 && classes.hidden)}
          fontSize='large'
          // color='secondary'
          style={{ color: theme.palette.error.main }}
        />
      </Grid>
    </Grid>
  );
}
