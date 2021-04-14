import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useSound from 'use-sound';

import DesignerCard from './DesignerCard';
import DesignerEditor from './DesignerEditor';
import ButtonNext from '../common/ButtonNext';
import { addAnswerGame, stopGame } from '../gameSlice';
import { activeWordDesigner, nextWordDesigner } from './designerSlice';
import trueSfx from '../../../assets/true.mp3';
import falseSfx from '../../../assets/false.mp3';
import {
  settingsAudioChallenge,
  settingsDesigner,
  settingsSoundOn,
} from '../../SettingsPage/settingsSlice';

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
  }),
);

export default function DesignerGame() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const word = useSelector(activeWordDesigner);
  const settings = useSelector(settingsDesigner);
  const soundOn = useSelector(settingsSoundOn);

  const [isOpenCard, setIsOpenCard] = useState(false);
  const [start, setStart] = useState(false);
  const [disableEditor, setDisableEditor] = useState(false);

  const [trueSound] = useSound(trueSfx, { soundEnabled: soundOn });
  const [falseSound] = useSound(falseSfx, { soundEnabled: soundOn });

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
    if (result) {
      trueSound();
    } else falseSound();
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
    dispatch(stopGame('designer'));
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
            langEn={settings.langWordEn}
          />
        </Grid>
        <Grid item container justify='center'>
          <ButtonNext isOpenCard={isOpenCard} onClick={handleClickNext} />
        </Grid>
      </Grid>
    </div>
  );
}
