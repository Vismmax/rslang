import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      left: 0,
      bottom: theme.spacing(1),
      width: '100%',
    },
    button: {
      opacity: 0.5,
    },
  }),
);

interface Props {
  onClick: () => void;
}

export default function PromoButtonNext({ onClick }: Props) {
  const classes = useStyles();
  const large = useMediaQuery('(min-width:400px)');

  return (
    <Grid className={classes.root} container justify='center'>
      <Fab
        className={classes.button}
        size={large ? 'large' : 'small'}
        aria-label='next'
        onClick={onClick}
      >
        <ExpandMoreIcon fontSize='large' />
      </Fab>
    </Grid>
  );
}
