import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import EcoIcon from '@material-ui/icons/Eco';
import HeadsetIcon from '@material-ui/icons/Headset';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
  }),
);

interface IEv {
  target: {
    value: string;
  };
}

export default function Games() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
        startIcon={<SportsEsportsIcon />}
        endIcon={<ExpandMoreIcon />}
      >
        Игры
      </Button>
      <Menu
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
        <MenuItem component={RouterLink} to='/savannah'>
          <ListItemIcon>
            <EcoIcon />
          </ListItemIcon>
          Саванна
        </MenuItem>
        <MenuItem component={RouterLink} to='/audioChallenge'>
          <ListItemIcon>
            <HeadsetIcon />
          </ListItemIcon>
          Аудиовызов
        </MenuItem>
        <MenuItem component={RouterLink} to='/sprint'>
          <ListItemIcon>
            <DirectionsRunIcon />
          </ListItemIcon>
          Спринт
        </MenuItem>
        <MenuItem component={RouterLink} to='/designer'>
          <ListItemIcon>
            <ViewModuleIcon />
          </ListItemIcon>
          Конструктор
        </MenuItem>
      </Menu>
    </div>
  );
}
