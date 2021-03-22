import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EcoIcon from '@material-ui/icons/Eco';
import HeadsetIcon from '@material-ui/icons/Headset';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    language: {
      overflow: 'hidden',
      width: 0,
      marginLeft: -8,
      marginRight: -8,
      // display: 'none',
      [theme.breakpoints.up('sm')]: {
        // display: 'inline',
        width: 'auto',
        marginLeft: 0,
        marginRight: 0,
      },
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
        <span className={classes.language}>Игры</span>
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
        <MenuItem href={'#'}>
          <ListItemIcon>
            <EcoIcon />
          </ListItemIcon>
          Саванна
        </MenuItem>
        <MenuItem href={'#'}>
          <ListItemIcon>
            <HeadsetIcon />
          </ListItemIcon>
          Аудиовызов
        </MenuItem>
        <MenuItem href={'#'}>
          <ListItemIcon>
            <DirectionsRunIcon />
          </ListItemIcon>
          Спринт
        </MenuItem>
        <MenuItem href={'#'}>
          <ListItemIcon>
            <SportsEsportsIcon />
          </ListItemIcon>
          Своя игра
        </MenuItem>
      </Menu>
    </div>
  );
}
