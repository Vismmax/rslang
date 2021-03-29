import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ISettingsSavannah, ISettingsSprint } from './settingsSlice';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';

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
  };
}

interface Props {
  settings: ISettingsSprint;
  onChange: (nameSettings: string, settings: ISettingsSprint) => void;
}

export default function SettingsSprint({ settings, onChange }: Props) {
  const classes = useStyles();

  const handleChange = (ev: Ev) => {
    onChange('sprint', {
      ...settings,
      [ev.target.name]: Number(ev.target.value),
    });
  };

  // const handleChangeTimeWord = (ev: Ev) => {
  //   onChange({
  //     ...settings,
  //     timeWord: Number(ev.target.value),
  //   });
  // };

  // const handleChangeCountError = (ev: Ev) => {
  //   onChange({
  //     ...settings,
  //     countError: Number(ev.target.value),
  //   });
  // };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography className={classes.title} variant='h6' component='h3'>
        Спринт
      </Typography>
      <div>
        <TextField
          className={classes.input}
          label='Время'
          helperText='Время показа одного слова'
          type='number'
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position='end'>Сек</InputAdornment>,
          }}
          name='timeWord'
          value={settings.timeWord}
          // onChange={handleChangeTimeWord}
          onChange={handleChange}
        />
        <TextField
          label='Количество ошибок'
          helperText='Количество возможных ошибок'
          type='number'
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position='end'>Сек</InputAdornment>,
          }}
          name='countError'
          value={settings.countError}
          // onChange={handleChangeCountError}
          onChange={handleChange}
        />
      </div>
    </Paper>
  );
}
