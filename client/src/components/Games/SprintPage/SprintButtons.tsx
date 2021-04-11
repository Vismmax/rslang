import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHotkeys } from 'react-hotkeys-hook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

interface Props {
  onClick: (res: boolean) => void;
  disable: boolean;
}

export default function SprintButtons({ onClick, disable }: Props) {
  const classes = useStyles();

  const handleClick = (result: boolean) => () => {
    if (disable) return;
    onClick(result);
  };

  useHotkeys('left', handleClick(false), [onClick]);
  useHotkeys('right', handleClick(true), [onClick]);

  return (
    <Grid className={classes.root} item container justify='center' spacing={4}>
      <Grid item>
        <Button
          variant='contained'
          color='secondary'
          startIcon={<KeyboardArrowLeftIcon />}
          onClick={handleClick(false)}
        >
          Неверно
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          color='primary'
          endIcon={<KeyboardArrowRightIcon />}
          onClick={handleClick(true)}
        >
          Верно
        </Button>
      </Grid>
    </Grid>
  );
}
