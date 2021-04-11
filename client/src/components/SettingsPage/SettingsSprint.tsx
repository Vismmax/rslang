import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { ISettingsSprint } from './settingsSlice';

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

  const handleSelectChange = (
    ev: ChangeEvent<{ value: unknown; name?: string | undefined }>,
  ) => {
    onChange('sprint', {
      ...settings,
      [ev.target.name as string]: ev.target.value as number,
    });
  };

  const handleCheckboxChange = (ev: Ev) => {
    onChange('sprint', {
      ...settings,
      [ev.target.name]: ev.target.checked,
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography className={classes.title} variant='h6' component='h3'>
        Спринт
      </Typography>
      <div>
        <FormControl className={classes.input}>
          <InputLabel id='timeGameSprint'>Время игры</InputLabel>
          <Select
            labelId='timeGameSprint'
            name='timeGame'
            value={settings.timeGame}
            onChange={handleSelectChange}
          >
            {new Array(5).fill(1).map((n, id) => (
              <MenuItem value={id * 15 + 30}>{id * 15 + 30} сек</MenuItem>
            ))}
          </Select>
          <FormHelperText>Время выделенное на игру</FormHelperText>
        </FormControl>

        <FormControlLabel
          className={classes.input}
          control={
            <Checkbox
              color='primary'
              checked={settings.showHelp}
              onChange={handleCheckboxChange}
              name='showHelp'
            />
          }
          label='Отображать подсказки ввиде картинок к словам'
        />
      </div>
    </Paper>
  );
}
