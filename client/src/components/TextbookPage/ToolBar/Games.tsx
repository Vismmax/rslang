import React, { useState } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EcoIcon from '@material-ui/icons/Eco';
import HeadsetIcon from '@material-ui/icons/Headset';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import IconButton from '@material-ui/core/IconButton';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useDispatch } from 'react-redux';
import { setRouteGame } from '../../Games/gameSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    link: {
      marginLeft: theme.spacing(2),
    },
    links: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    icons: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    menu: {
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  }),
);

export default function Games() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (rout: string) => () => {
    dispatch(setRouteGame(location.pathname));
    history.push(rout);
    setAnchorEl(null);
  };

  return (
    <>
      <div className={classes.links}>
        <Button
          className={classes.link}
          color='inherit'
          startIcon={<EcoIcon />}
          onClick={handleClick('/savannah')}
        >
          Саванна
        </Button>
        <Button
          className={classes.link}
          color='inherit'
          startIcon={<HeadsetIcon />}
          onClick={handleClick('/audioChallenge')}
        >
          Аудиовызов
        </Button>
        <Button
          className={classes.link}
          color='inherit'
          startIcon={<DirectionsRunIcon />}
          onClick={handleClick('/sprint')}
        >
          Спринт
        </Button>
        <Button
          className={classes.link}
          color='inherit'
          startIcon={<ViewModuleIcon />}
          onClick={handleClick('/designer')}
        >
          Конструктор
        </Button>
      </div>

      <div className={classes.icons}>
        <IconButton
          aria-label='settings'
          color='inherit'
          onClick={handleClick('/savannah')}
        >
          <EcoIcon />
        </IconButton>
        <IconButton
          aria-label='settings'
          color='inherit'
          onClick={handleClick('/audioChallenge')}
        >
          <HeadsetIcon />
        </IconButton>
        <IconButton
          aria-label='settings'
          color='inherit'
          onClick={handleClick('/sprint')}
        >
          <DirectionsRunIcon />
        </IconButton>
        <IconButton
          aria-label='settings'
          color='inherit'
          onClick={handleClick('/designer')}
        >
          <ViewModuleIcon />
        </IconButton>
      </div>

      <div className={classes.menu}>
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
          <MenuItem onClick={handleClick('/savannah')}>
            <ListItemIcon>
              <EcoIcon />
            </ListItemIcon>
            Саванна
          </MenuItem>
          <MenuItem onClick={handleClick('/audioChallenge')}>
            <ListItemIcon>
              <HeadsetIcon />
            </ListItemIcon>
            Аудиовызов
          </MenuItem>
          <MenuItem onClick={handleClick('/sprint')}>
            <ListItemIcon>
              <DirectionsRunIcon />
            </ListItemIcon>
            Спринт
          </MenuItem>
          <MenuItem onClick={handleClick('/designer')}>
            <ListItemIcon>
              <ViewModuleIcon />
            </ListItemIcon>
            Конструктор
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
