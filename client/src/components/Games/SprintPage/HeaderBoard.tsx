import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import yellow from '@material-ui/core/colors/yellow';
import clsx from 'clsx';

import { seriesValues } from './SprintGame';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    series1: {
      backgroundColor: yellow['A700'],
    },
    series2: {
      backgroundColor: theme.palette.warning.main,
    },
    series3: {
      backgroundColor: theme.palette.error.main,
    },
  }),
);

interface Props {
  episode: number;
  series: number;
}

export default function HeaderBoard({ episode, series }: Props) {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.root,
        classes[`series${series}` as 'series1' | 'series2' | 'series3'],
      )}
    >
      <Grid container direction='column' spacing={2}>
        <Grid item container justify='center'>
          <Rating
            readOnly
            max={series === 3 ? 1 : 3}
            value={episode}
            emptyIcon={<Brightness1Icon fontSize='inherit' />}
            icon={<CheckCircleIcon fontSize='inherit' color='primary' />}
          />
        </Grid>
        <Grid item container justify='center'>
          <Typography variant='body1'>
            +{seriesValues[series]} очков за слово
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
