import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHotkeys } from 'react-hotkeys-hook';
import Grid from '@material-ui/core/Grid';
import Bounce from 'react-reveal/Bounce';

import { IWord } from '../../../common/interfaces/WordInterfaces';
import { shuffleArray } from '../../../common/helpers/randomHelper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    wrapLetters: {
      minHeight: 91,
    },
    letter: {
      fontSize: theme.typography.h4.fontSize,
      fontWeight: theme.typography.fontWeightBold,
      minWidth: theme.spacing(4),
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      [theme.breakpoints.down('xs')]: {
        minWidth: theme.spacing(3),
        paddingLeft: theme.spacing(0.25),
        paddingRight: theme.spacing(0.25),
      },
      textShadow: '0px 0px 8px rgb(255 255 255)',
    },
    wrapButtons: {
      minHeight: 66,
    },
    button: {
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
  langEn?: boolean;
}

export default function DesignerEditor({
  word,
  onResult,
  disable = false,
  langEn = true,
}: Props) {
  const classes = useStyles();

  const [buttons, setButtons] = useState<Letter[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [delay, setDelay] = useState(1);

  const wordLang = langEn ? word.word : word.wordTranslate;

  useEffect(() => {
    setDelay(1);
    if (word.id) {
      const shuffleLetters = shuffleArray(
        wordLang.split('').map((letter, id) => ({ letter, id })),
      );
      setLetters([]);
      setButtons(shuffleLetters);
    }
  }, [wordLang]);

  const handleClickLetter = (letter: Letter) => () => {
    setLetters(letters.filter((lt) => lt.id !== letter.id));
    setButtons([...buttons, letter]);
  };

  const handleClickButtons = (letter: Letter) => () => {
    setDelay(0);
    const wrd = [...letters, letter].map((lt) => lt.letter).join('');
    if (wrd === wordLang) onResult(true);
    setButtons(buttons.filter((btn) => btn.id !== letter.id));
    setLetters([...letters, letter]);
  };

  const handleKey = (event: KeyboardEvent, handler: { key: string }) => {
    const letter = buttons.find((btn) => btn.letter === handler.key);
    if (letter) handleClickButtons(letter)();
  };

  useHotkeys(Array.from(new Set(wordLang.split(''))).join(','), handleKey, [
    wordLang,
    buttons,
    letters,
  ]);

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
          <Grid key={letter.id + letter.letter + wordLang} item>
            <Bounce>
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
            </Bounce>
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
        {buttons.map((btn, id) => (
          <Grid key={btn.id + btn.letter + wordLang} item>
            <Bounce bottom delay={id * 100 * delay}>
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
            </Bounce>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
