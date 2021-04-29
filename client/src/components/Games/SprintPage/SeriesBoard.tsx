import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import FlightIcon from '@material-ui/icons/Flight';
import yellow from '@material-ui/core/colors/yellow';
import clsx from 'clsx';

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
          style={{ color: theme.palette.error.main }}
        />
      </Grid>
    </Grid>
  );
}
