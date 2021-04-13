import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { ISettingsSavannah } from './settingsSlice';

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
  settings: ISettingsSavannah;
  onChange: (nameSettings: string, settings: ISettingsSavannah) => void;
}

export default function SettingsSavannah({ settings, onChange }: Props) {
  const classes = useStyles();

  const handleChange = (ev: Ev) => {
    onChange('savannah', {
      ...settings,
      [ev.target.name]: Number(ev.target.value),
    });
  };

  const handleSelectChange = (
    ev: ChangeEvent<{ value: unknown; name?: string | undefined }>,
  ) => {
    onChange('savannah', {
      ...settings,
      [ev.target.name as string]: ev.target.value as number,
    });
  };

  const handleCheckboxChange = (ev: Ev) => {
    onChange('savannah', {
      ...settings,
      [ev.target.name]: ev.target.checked,
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography className={classes.title} variant='h6' component='h3'>
        Саванна
      </Typography>
      <div>
        <FormControl className={classes.input}>
          <InputLabel id='timeWordSavannah'>Время</InputLabel>
          <Select
            labelId='timeWordSavannah'
            name='timeWord'
            value={settings.timeWord}
            onChange={handleSelectChange}
          >
            <MenuItem value={4}>Я Спиди Гонзалес</MenuItem>
            {new Array(14).fill(1).map((n, id) => (
              <MenuItem value={id + 5}>{id + 5} сек</MenuItem>
            ))}
          </Select>
          <FormHelperText>Время показа одного слова в секундах</FormHelperText>
        </FormControl>

        <FormControl className={classes.input}>
          <InputLabel id='countErrorSavannah'>Количество ошибок</InputLabel>
          <Select
            labelId='countErrorSavannah'
            name='countError'
            value={settings.countError}
            onChange={handleSelectChange}
          >
            <MenuItem value={0}>Без права на ошибку</MenuItem>
            {new Array(9).fill(1).map((n, id) => (
              <MenuItem value={id + 1}>{id + 1}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Количество возможных ошибок</FormHelperText>
        </FormControl>

        <FormControl className={classes.input}>
          <InputLabel id='countVariantsSavannah'>Количество ответов</InputLabel>
          <Select
            labelId='countVariantsSavannah'
            name='countVariants'
            value={settings.countVariants}
            onChange={handleSelectChange}
          >
            {new Array(8).fill(1).map((n, id) => (
              <MenuItem value={id + 2}>{id + 2}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Количество вариантов ответов</FormHelperText>
        </FormControl>

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
