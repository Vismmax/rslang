import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '40vh',
    },
  }),
);

interface Props {
  text: string;
}

export default function EmptyPage({ text }: Props) {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      justify='center'
      alignItems='center'
    >
      <Grid item>
        <Typography align='center' variant='h4' color='textSecondary'>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
}
