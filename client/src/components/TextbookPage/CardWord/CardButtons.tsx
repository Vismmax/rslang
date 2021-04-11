import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { userStore } from '../../LoginPage/userSlice';
import { idLoadingWord } from '../textbookSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonRelative: {
      position: 'relative',
    },
    buttonProgress: {
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
  difficulty: string;
  onClickHard: () => void;
  onClickDelete: () => void;
}

export default function CardButtons({
  wordId,
  difficulty,
  onClickHard,
  onClickDelete,
}: Props) {
  const classes = useStyles();
  const user = useSelector(userStore);
  const idLoading = useSelector(idLoadingWord);

  const hard = difficulty === 'hard';

  return (
    <Grid item>
      <ButtonGroup variant='contained' size='small'>
        <Button
          className={classes.buttonRelative}
          disabled={!user.userId || idLoading === wordId}
          color={hard ? 'default' : 'primary'}
          onClick={onClickHard}
        >
          {hard ? 'Простое' : 'Сложное'}
          {idLoading === wordId && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
        <Button
          disabled={!user.userId || idLoading === wordId}
          color='secondary'
          onClick={onClickDelete}
        >
          Удалить
        </Button>
      </ButtonGroup>
    </Grid>
  );
}
