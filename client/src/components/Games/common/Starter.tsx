import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import useSound from 'use-sound';

import tickSfx from '../../../assets/tick.mp3';
import gongSfx from '../../../assets/gong.mp3';
import { useSelector } from 'react-redux';
import { settingsSoundOn } from '../../SettingsPage/settingsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

interface Props {
  open?: boolean;
  time?: number;
  onStop: () => void;
}

export function Starter({ open = true, time = 5, onStop }: Props) {
  const classes = useStyles();
  const soundOn = useSelector(settingsSoundOn);
  const [progress, setProgress] = React.useState(0);

  const [tick] = useSound(tickSfx, { soundEnabled: soundOn });
  const [gong] = useSound(gongSfx, { soundEnabled: soundOn });

  useEffect(() => {
    tick();
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let timer: number;
    if (progress === time) {
      gong();
      timer = window.setTimeout(() => {
        onStop();
        return;
      }, 500);
    }
    tick();
    return () => {
      clearTimeout(timer);
    };
  }, [progress]);

  return (
    <Backdrop className={classes.root} open={open}>
      <Box position='relative' display='inline-flex'>
        <CircularProgress
          size={160}
          variant='determinate'
          value={(100 / time) * progress}
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
          <Typography variant='h1' component='div'>
            {time - progress}
          </Typography>
        </Box>
      </Box>
    </Backdrop>
  );
}
