import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '50%',
    },
    text: {
      fontWeight: theme.typography.fontWeightBold,
    },
    progress: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(8),
        height: theme.spacing(8),
      },
    },
  }),
);

interface Props {
  timeGame: number;
  time: number;
}

export function SprintProgress({ timeGame, time }: Props) {
  const classes = useStyles();

  return (
    <Box className={classes.root} position='relative' display='inline-flex'>
      <CircularProgress
        className={classes.progress}
        variant='determinate'
        color='secondary'
        // size={80}
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
