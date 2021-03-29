import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHotkeys } from 'react-hotkeys-hook';
import Button from '@material-ui/core/Button';
import { IWord } from '../../../common/interfaces/WordInterfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // position: 'absolute',
      // left: 0,
      // bottom: theme.spacing(3),
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      // width: '100%',
      // [theme.breakpoints.up('sm')]: {
      //   bottom: theme.spacing(8),
      // },
      // [theme.breakpoints.up('md')]: {
      //   bottom: theme.spacing(12),
      // },
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
      // Вариант в круге
      // borderRadius: '50%',
      // backgroundColor: 'rgba(0, 0, 0, 0.2)',
      // color: 'white',
    },
  }),
);

interface Props {
  words: IWord[];
  trueWord: IWord;
  onClick: (isTrue: boolean) => void;
}

export default function ButtonsWords({ words, trueWord, onClick }: Props) {
  const classes = useStyles();
  const [isShowTrue, setIsShowTrue] = useState(false);
  const [clickButtonId, setClickButtonId] = useState('');

  useEffect(() => {
    setIsShowTrue(false);
    setClickButtonId('');
  }, [words, trueWord]);

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
      // id === trueWord.id? return 'primary': return 'secondary'
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
