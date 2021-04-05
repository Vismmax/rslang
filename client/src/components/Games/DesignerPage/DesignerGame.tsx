import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  activeVariantsDesigner,
  activeWordDesigner,
  nextWordDesigner,
} from './designerSlice';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DesignerCard from './DesignerCard';
import DesignerEditor from './DesignerEditor';
import { addAnswerGame, stopGame } from '../gameSlice';
import ButtonNext from '../common/ButtonNext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: theme.spacing(8),
    },

    card: {
      maxWidth: theme.spacing(40),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    space: {
      margin: theme.spacing(2, 0),
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(4, 0),
      },
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(6, 0),
      },
    },
    // button: {
    //   width: theme.spacing(20),
    //   opacity: 0.8,
    // },
  }),
);

export default function DesignerGame() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const word = useSelector(activeWordDesigner);
  const variants = useSelector(activeVariantsDesigner);

  const [isOpenCard, setIsOpenCard] = useState(false);
  const [start, setStart] = useState(false);
  const [disableEditor, setDisableEditor] = useState(false);

  useEffect(() => {
    dispatch(nextWordDesigner());
  }, []);

  useEffect(() => {
    if (!start) {
      setStart(true);
      return;
    }
    if (!word.id) {
      finishGame();
      return;
    }
  }, [word]);

  const handleResult = (result: boolean) => {
    setIsOpenCard(true);
    setDisableEditor(true);
    dispatch(addAnswerGame({ word, result }));
  };

  const fetchNewWord = () => {
    dispatch(nextWordDesigner());
  };

  const handleClickVariant = (isTrue: boolean) => {
    handleResult(isTrue);
  };

  const handleClickNext = () => {
    if (!isOpenCard) {
      handleResult(false);
    } else {
      setIsOpenCard(false);
      setDisableEditor(false);
      fetchNewWord();
    }
  };

  const finishGame = () => {
    setStart(false);
    dispatch(stopGame());
    console.log('finish');
  };

  return (
    <div className={classes.root}>
      <Grid container direction='column' justify='center'>
        <Grid item container direction='column'>
          <Grid className={classes.card}>
            <DesignerCard isOpen={isOpenCard} word={word} />
          </Grid>
        </Grid>
        <Grid className={classes.space} item>
          <DesignerEditor
            word={word}
            onResult={handleClickVariant}
            disable={disableEditor}
          />
        </Grid>
        <Grid item container justify='center'>
          <ButtonNext isOpenCard={isOpenCard} onClick={handleClickNext} />
        </Grid>
      </Grid>
    </div>
  );
}
