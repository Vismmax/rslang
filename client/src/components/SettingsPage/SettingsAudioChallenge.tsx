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

import { ISettingsAudioChallenge } from './settingsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    title: {
      marginBottom: theme.spacing(3),
    },
    input: {
      width: '100%',
      margin: theme.spacing(2, 0),
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
  settings: ISettingsAudioChallenge;
  onChange: (nameSettings: string, settings: ISettingsAudioChallenge) => void;
}

export default function SettingsAudioChallenge({ settings, onChange }: Props) {
  const classes = useStyles();

  const handleChange = (ev: Ev) => {
    onChange('audioChallenge', {
      ...settings,
      [ev.target.name]: Number(ev.target.value),
    });
  };

  const handleSelectChange = (
    ev: ChangeEvent<{ value: unknown; name?: string | undefined }>,
  ) => {
    onChange('audioChallenge', {
      ...settings,
      [ev.target.name as string]: ev.target.value as number,
    });
  };

  const handleCheckboxChange = (ev: Ev) => {
    onChange('audioChallenge', {
      ...settings,
      [ev.target.name]: ev.target.checked,
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography className={classes.title} variant='h6' component='h3'>
        Аудиовызов
      </Typography>
      <div>
        <FormControl className={classes.input}>
          <InputLabel id='countWordsAudioChallenge'>Количество слов</InputLabel>
          <Select
            labelId='countWordsAudioChallenge'
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

        <FormControl className={classes.input}>
          <InputLabel id='countVariantsAudioChallenge'>
            Количество ответов
          </InputLabel>
          <Select
            labelId='countVariantsAudioChallenge'
            name='countVariants'
            value={settings.countVariants}
            onChange={handleSelectChange}
          >
            {new Array(5).fill(1).map((n, id) => (
              <MenuItem value={id + 2}>{id + 2}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Количество вариантов ответов</FormHelperText>
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
