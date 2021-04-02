import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IExtWord } from '../../../common/interfaces/WordInterfaces';
import { useDispatch } from 'react-redux';
import CardLayout from '../../TextbookPage/CardWord/CardLayout';
import CardButton from './CardButton';
import { fetchDeleteUserWord } from '../dictionarySlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

interface Props {
  word: IExtWord;
}

export default function CardDictionary({ word }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickRestore = () => {
    dispatch(fetchDeleteUserWord(word.id));
  };

  return (
    <CardLayout
      className={classes.root}
      word={word}
      buttons={<CardButton wordId={word.id} onClick={handleClickRestore} />}
    />
  );
}
