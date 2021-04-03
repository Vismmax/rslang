import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IWord } from '../../../common/interfaces/WordInterfaces';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { shuffleArray } from '../../../common/helpers/randomHelper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    wrapLetters: {
      minHeight: 75,
    },
    letter: {
      // minWidth: theme.spacing(4.5),
      fontSize: theme.typography.h4.fontSize,
      fontWeight: theme.typography.fontWeightBold,
      minWidth: theme.spacing(4),
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      [theme.breakpoints.down('xs')]: {
        // fontSize: theme.typography.h5.fontSize,
        minWidth: theme.spacing(3),
        paddingLeft: theme.spacing(0.25),
        paddingRight: theme.spacing(0.25),
      },
      textShadow: '0px 0px 8px rgb(255 255 255)',
    },
    wrapButtons: {
      minHeight: 50,
    },
    button: {
      // minWidth: theme.spacing(4.5),
      minWidth: theme.spacing(5.25),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  }),
);

interface Letter {
  letter: string;
  id: number;
}

interface Props {
  word: IWord;
  onResult: (isTrue: boolean) => void;
  disable?: boolean;
}

export default function DesignerEditor({
  word,
  onResult,
  disable = false,
}: Props) {
  const classes = useStyles();

  const [buttons, setButtons] = useState<Letter[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    if (word.id) {
      const shuffleLetters = shuffleArray(
        word.word.split('').map((letter, id) => ({ letter, id })),
      );
      setLetters([]);
      setButtons(shuffleLetters);
    }
  }, [word]);

  const handleClickLetter = (letter: Letter) => () => {
    setLetters(letters.filter((lt) => lt.id !== letter.id));
    setButtons([...buttons, letter]);
  };

  const handleClickButtons = (letter: Letter) => () => {
    const wrd = [...letters, letter].map((lt) => lt.letter).join('');
    if (wrd === word.word) onResult(true);
    setButtons(buttons.filter((btn) => btn.id !== letter.id));
    setLetters([...letters, letter]);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        className={classes.wrapLetters}
        item
        container
        spacing={0}
        justify='center'
      >
        {letters.map((letter) => (
          <Grid item>
            <Button
              className={classes.letter}
              key={letter.id}
              color='primary'
              size='large'
              disabled={disable}
              onClick={handleClickLetter(letter)}
            >
              {letter.letter}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid
        className={classes.wrapButtons}
        item
        container
        spacing={1}
        justify='center'
      >
        {buttons.map((btn) => (
          <Grid item>
            <Button
              className={classes.button}
              key={btn.id}
              variant='contained'
              size='large'
              disabled={disable}
              onClick={handleClickButtons(btn)}
            >
              {btn.letter}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}