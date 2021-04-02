import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(3),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(3),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(4),
    },
  }),
);

interface Props {
  open: boolean;
  onChange: (level: number) => void;
  onCancel: () => void;
}

export default function SettingsGame({ open, onChange, onCancel }: Props) {
  const classes = useStyles();

  const [level, setLevel] = React.useState('');

  const handleStart = () => {
    onChange(Number(level));
  };

  const handleClose = () => {
    onCancel();
  };

  const handleChangeLevel = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLevel(event.target.value as string);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby='settings-dialog-title'
      aria-describedby='settings-dialog-description'
    >
      <DialogTitle id='settings-dialog-title'>
        <Typography variant='h5'>Настройки игры</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant='h6' gutterBottom>
          Выберите сложность игры
        </Typography>

        <FormControl className={classes.formControl}>
          <InputLabel id='level'>Уровень</InputLabel>
          <Select
            labelId='level'
            id='demo-simple-select'
            value={level}
            onChange={handleChangeLevel}
          >
            <MenuItem value={0}>Уровень 1</MenuItem>
            <MenuItem value={1}>Уровень 2</MenuItem>
            <MenuItem value={2}>Уровень 3</MenuItem>
            <MenuItem value={3}>Уровень 4</MenuItem>
            <MenuItem value={4}>Уровень 5</MenuItem>
            <MenuItem value={5}>Уровень 6</MenuItem>
          </Select>
        </FormControl>

        <div className={classes.buttons}>
          <Button variant='contained' onClick={handleClose}>
            Отмена
          </Button>
          <Button
            variant='contained'
            onClick={handleStart}
            color='primary'
            disabled={level === ''}
          >
            Старт
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
