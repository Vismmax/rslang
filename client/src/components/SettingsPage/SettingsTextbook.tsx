import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { ISettingsTextbook } from './settingsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(5),
      padding: theme.spacing(1, 3),
    },
    input: {
      margin: theme.spacing(5, 0),
    },
  }),
);

interface Ev {
  target: {
    checked: boolean;
    name: string;
  };
}

interface Props {
  settings: ISettingsTextbook;
  onChange: (nameSettings: string, settings: ISettingsTextbook) => void;
}

export default function SettingsTextbook({ settings, onChange }: Props) {
  const classes = useStyles();

  const handleChange = (ev: Ev) => {
    onChange('textbook', {
      ...settings,
      [ev.target.name]: ev.target.checked,
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <div className={classes.input}>
        <FormControlLabel
          control={
            <Checkbox
              color='primary'
              checked={settings.showTranslate}
              onChange={handleChange}
              name='showTranslate'
            />
          }
          label='Отображать в списке слов перевод изучаемого слова и перевод предложений с ним'
        />
      </div>

      <div className={classes.input}>
        <FormControlLabel
          control={
            <Checkbox
              color='primary'
              checked={settings.showButtons}
              onChange={handleChange}
              name='showButtons'
            />
          }
          label='Отображать возле каждого слова кнопки, при клике по которым данное слово добавляется в раздел словаря "Сложные слова" или "Удалённые слова"'
        />
      </div>
    </Paper>
  );
}
