import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CardWord from '../common/CardWord';
import { IWord } from '../../../common/interfaces/WordInterfaces';
import { settingsDesigner } from '../../SettingsPage/settingsSlice';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    word: {
      textAlign: 'center',
      fontSize: theme.typography.h3.fontSize,
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.h4.fontSize,
      },
      color: 'white',
      textShadow:
        '0px 3px 0px #b2a98f, 0px 14px 10px rgba(0,0,0,0.15), 0px 6px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1)',
    },
  }),
);

interface Props {
  isOpen: boolean;
  word: IWord;
}

export default function DesignerCard({ isOpen, word }: Props) {
  const classes = useStyles();
  const settings = useSelector(settingsDesigner);

  return (
    <CardWord
      // paper={true}
      isOpen={isOpen}
      word={word}
      showTranslate={settings.showTranslate}
      questionContent={
        <Typography className={classes.word} variant='h4'>
          {word.wordTranslate}
        </Typography>
      }
    />
  );
}
