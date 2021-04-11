import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

interface Props {
  optional: {
    correctCount: number;
    errorCount: number;
  };
}

export default function CardAnswers({ optional }: Props) {
  const classes = useStyles();

  return (
    <Grid item>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant='body2'>
            Правильных ответов: {optional.correctCount}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body2'>
            Не правильных ответов: {optional.errorCount}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
