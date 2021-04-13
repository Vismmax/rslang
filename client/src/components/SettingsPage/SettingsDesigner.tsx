import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { ISettingsDesigner } from './settingsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    title: {
      marginBottom: theme.spacing(3),
    },
    input: {
      margin: theme.spacing(3, 0),
    },
  }),
);

interface Ev {
  target: {
    value: string;
    name: string;
    checked: boolean;
  };
}

interface Props {
  settings: ISettingsDesigner;
  onChange: (nameSettings: string, settings: ISettingsDesigner) => void;
}

export default function SettingsDesigner({ settings, onChange }: Props) {
  const classes = useStyles();

  const handleChange = (ev: Ev) => {
    onChange('designer', {
      ...settings,
      [ev.target.name]: Number(ev.target.value),
    });
  };

  const handleSelectChange = (
    ev: ChangeEvent<{ value: unknown; name?: string | undefined }>,
  ) => {
    onChange('designer', {
      ...settings,
      [ev.target.name as string]: ev.target.value as number,
    });
  };

  const handleCheckboxChange = (ev: Ev) => {
    onChange('designer', {
      ...settings,
      [ev.target.name]: ev.target.checked,
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography className={classes.title} variant='h6' component='h3'>
        Конструктор
      </Typography>
      <div>
        <FormControl className={classes.input}>
          <InputLabel id='countWordsDesigner'>Количество слов</InputLabel>
          <Select
            labelId='countWordsDesigner'
            name='countWords'
            value={settings.countWords}
            onChange={handleSelectChange}
          >
            {new Array(11).fill(1).map((n, id) => (
              <MenuItem value={id + 10}>{id + 10}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Количество слов в игре</FormHelperText>
        </FormControl>

        <FormControlLabel
          className={classes.input}
          control={
            <Checkbox
              color='primary'
              checked={settings.showTranslate}
              onChange={handleCheckboxChange}
              name='showTranslate'
            />
          }
          label='Отображать в правильных ответах перевод и транскрипцию'
        />

        <FormControlLabel
          className={classes.input}
          control={
            <Switch
              color='primary'
              checked={settings.langWordEn}
              onChange={handleCheckboxChange}
              name='langWordEn'
            />
          }
          label={`Отабражать слово вопрос на ${
            settings.langWordEn ? 'английском' : 'русском'
          } языке`}
        />
      </div>
    </Paper>
  );
}
