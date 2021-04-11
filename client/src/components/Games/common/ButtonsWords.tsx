import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHotkeys } from 'react-hotkeys-hook';

import { IWord } from '../../../common/interfaces/WordInterfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      zIndex: theme.zIndex.drawer - 1,
    },
    button: {
      margin: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(2),
      },
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(3),
      },
    },
    key: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      color: theme.palette.text.secondary,
      fontSize: '14px !important',
    },
  }),
);

interface Props {
  words: IWord[];
  trueWord: IWord;
  show?: boolean;
  onClick: (isTrue: boolean) => void;
}

export default function ButtonsWords({
  words,
  trueWord,
  onClick,
  show = false,
}: Props) {
  const classes = useStyles();
  const [isShowTrue, setIsShowTrue] = useState(false);
  const [clickButtonId, setClickButtonId] = useState('');

  useEffect(() => {
    setIsShowTrue(false);
    setClickButtonId('');
  }, [words, trueWord]);

  useEffect(() => {
    if (show && !isShowTrue) setIsShowTrue(true);
  }, [show]);

  const handleClick = (word: IWord) => () => {
    if (isShowTrue) return;
    setIsShowTrue(true);
    setClickButtonId(word.id);
    onClick(word.id === trueWord.id);
  };

  const handleKey = (event: KeyboardEvent, handler: { key: string }) => {
    const id = Number(handler.key);
    if (id <= words.length) handleClick(words[id - 1])();
  };

  useHotkeys('1,2,3,4,5,6,7,8,9', handleKey, [words]);

  const getColor = (id: string): 'default' | 'primary' | 'secondary' => {
    if (!isShowTrue) return 'default';
    if (id === clickButtonId) {
      if (id === trueWord.id) return 'primary';
      return 'secondary';
    }
    if (id === trueWord.id) return 'primary';
    return 'default';
  };

  return (
    <div className={classes.root}>
      {words.map((word, id) => (
        <Button
          key={word.id}
          className={classes.button}
          color={getColor(word.id)}
          variant='contained'
          startIcon={<span className={classes.key}>{id + 1}</span>}
          onClick={handleClick(word)}
        >
          {word.wordTranslate}
        </Button>
      ))}
    </div>
  );
}
