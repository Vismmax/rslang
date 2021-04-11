import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SettingsIcon from '@material-ui/icons/Settings';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import {
  settingsTextbook,
  saveSettings,
} from '../../SettingsPage/settingsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(3),
    },
    link: {
      marginLeft: theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    icon: {
      marginLeft: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    item: {
      whiteSpace: 'normal',
    },
  }),
);

export default function Settings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const settings = useSelector(settingsTextbook);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickShowTranslate = () => {
    dispatch(
      saveSettings({
        nameSettings: 'textbook',
        settings: {
          ...settings,
          showTranslate: !settings.showTranslate,
        },
      }),
    );
  };

  const handleClickShowButtons = () => {
    dispatch(
      saveSettings({
        nameSettings: 'textbook',
        settings: {
          ...settings,
          showButtons: !settings.showButtons,
        },
      }),
    );
  };

  return (
    <div>
      <Button
        className={classes.link}
        color='inherit'
        startIcon={<SettingsIcon />}
        onClick={handleMenu}
      >
        Настройки
      </Button>
      <IconButton
        className={classes.icon}
        edge='end'
        aria-label='settings'
        color='inherit'
        onClick={handleMenu}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem className={classes.item} onClick={handleClickShowTranslate}>
          <ListItemIcon>
            <Checkbox
              edge='start'
              name='showTranslate'
              checked={settings.showTranslate}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          Отображать в списке слов переводы
        </MenuItem>
        <MenuItem className={classes.item} onClick={handleClickShowButtons}>
          <ListItemIcon>
            <Checkbox
              edge='start'
              name='showButtons'
              checked={settings.showButtons}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          Отображать кнопки действий для слов
        </MenuItem>
      </Menu>
    </div>
  );
}
