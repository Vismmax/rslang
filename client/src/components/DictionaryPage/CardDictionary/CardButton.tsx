import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { idLoadingWord } from '../dictionarySlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    progress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

interface Props {
  wordId: string;
  onClick: () => void;
}

export default function CardButton({ wordId, onClick }: Props) {
  const classes = useStyles();
  const idLoading = useSelector(idLoadingWord);

  return (
    <Button
      className={classes.root}
      variant='contained'
      size='small'
      color='default'
      disabled={idLoading === wordId}
      onClick={onClick}
    >
      Восстановить
      {idLoading === wordId && (
        <CircularProgress size={24} className={classes.progress} />
      )}
    </Button>
  );
}
