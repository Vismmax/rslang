import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IExtWord } from '../../../common/interfaces/WordInterfaces';
import { useDispatch } from 'react-redux';
import { fetchWordSetDifficulty } from '../textbookSlice';
import CardButtons from './CardButtons';
import CardLayout from './CardLayout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

interface Props {
  word: IExtWord;
}

export default function CardWord({ word }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickHard = () => {
    if (word.userWord.difficulty === 'hard') {
      dispatch(fetchWordSetDifficulty({ id: word.id, difficulty: 'work' }));
    } else {
      dispatch(fetchWordSetDifficulty({ id: word.id, difficulty: 'hard' }));
    }
  };

  const handleClickDelete = () => {
    dispatch(fetchWordSetDifficulty({ id: word.id, difficulty: 'delete' }));
  };

  return (
    <CardLayout
      className={classes.root}
      word={word}
      buttons={
        <CardButtons
          wordId={word.id}
          difficulty={word.userWord.difficulty}
          onClickHard={handleClickHard}
          onClickDelete={handleClickDelete}
        />
      }
    />
  );
}
