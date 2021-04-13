import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '50%',
    },
    text: {
      fontWeight: theme.typography.fontWeightBold,
    },
  }),
);

interface Props {
  timeGame: number;
  time: number;
}

export function SprintProgress({ timeGame, time }: Props) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Box className={classes.root} position='relative' display='inline-flex'>
      <CircularProgress
        variant='determinate'
        color='secondary'
        size={matches ? 80 : 60}
        value={(time * 100) / timeGame}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography
          className={classes.text}
          variant='h4'
          component='div'
          color='secondary'
        >
          {time}
        </Typography>
      </Box>
    </Box>
  );
}
