import React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import { loadWords, resetGame } from './gameSlice';

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
}

export default function SettingsGame({ open = false }: Props) {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const handleStart = () => {
    dispatch(loadWords(Number(level)));
  };

  const handleClose = () => {
    dispatch(resetGame());
    history.goBack();
  };

  const [level, setLevel] = React.useState('');

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
            disabled={!level}
          >
            Старт
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
