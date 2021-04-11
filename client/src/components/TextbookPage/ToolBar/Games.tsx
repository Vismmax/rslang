import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
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
import Tooltip from '@material-ui/core/Tooltip';

import { setRouteGame } from '../../Games/gameSlice';
import { activeWordsLength } from '../textbookSlice';
import { dictionaryWordsLength } from '../../DictionaryPage/dictionarySlice';

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

interface PropsMenuTooltip {
  children: JSX.Element;
  disabled: boolean | undefined;
}

const MenuTooltip = ({ children, disabled }: PropsMenuTooltip) => (
  <Tooltip
    title={
      disabled
        ? 'В этом разделе нет слов для игры'
        : 'Запустить игру со словами из данного раздела'
    }
    enterDelay={disabled ? 100 : 700}
  >
    <span>{children}</span>
  </Tooltip>
);

const ButtonTooltip = (props: any) => (
  <MenuTooltip disabled={props?.disabled}>
    <Button {...props}>{props.children}</Button>
  </MenuTooltip>
);

const IconButtonTooltip = (props: any) => (
  <MenuTooltip disabled={props?.disabled}>
    <IconButton {...props}>{props.children}</IconButton>
  </MenuTooltip>
);

export default function Games() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const textbookLength = useSelector(activeWordsLength);
  const dictionaryLength = useSelector(dictionaryWordsLength);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const disabled = !textbookLength && !dictionaryLength;

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
        <ButtonTooltip
          className={classes.link}
          color='inherit'
          startIcon={<EcoIcon />}
          disabled={disabled}
          onClick={handleClick('/savannah')}
        >
          Саванна
        </ButtonTooltip>
        <ButtonTooltip
          className={classes.link}
          color='inherit'
          startIcon={<HeadsetIcon />}
          disabled={disabled}
          onClick={handleClick('/audioChallenge')}
        >
          Аудиовызов
        </ButtonTooltip>
        <ButtonTooltip
          className={classes.link}
          color='inherit'
          startIcon={<DirectionsRunIcon />}
          disabled={disabled}
          onClick={handleClick('/sprint')}
        >
          Спринт
        </ButtonTooltip>
        <ButtonTooltip
          className={classes.link}
          color='inherit'
          startIcon={<ViewModuleIcon />}
          disabled={disabled}
          onClick={handleClick('/designer')}
        >
          Конструктор
        </ButtonTooltip>
      </div>

      <div className={classes.icons}>
        <IconButtonTooltip
          color='inherit'
          disabled={disabled}
          onClick={handleClick('/savannah')}
        >
          <EcoIcon />
        </IconButtonTooltip>
        <IconButtonTooltip
          color='inherit'
          disabled={disabled}
          onClick={handleClick('/audioChallenge')}
        >
          <HeadsetIcon />
        </IconButtonTooltip>
        <IconButtonTooltip
          color='inherit'
          disabled={disabled}
          onClick={handleClick('/sprint')}
        >
          <DirectionsRunIcon />
        </IconButtonTooltip>
        <IconButtonTooltip
          color='inherit'
          disabled={disabled}
          onClick={handleClick('/designer')}
        >
          <ViewModuleIcon />
        </IconButtonTooltip>
      </div>

      <div className={classes.menu}>
        <ButtonTooltip
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
          startIcon={<SportsEsportsIcon />}
          endIcon={<ExpandMoreIcon />}
          disabled={disabled}
          onClick={handleMenu}
        >
          Игры
        </ButtonTooltip>
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
          <MenuItem disabled={disabled} onClick={handleClick('/savannah')}>
            <ListItemIcon>
              <EcoIcon />
            </ListItemIcon>
            Саванна
          </MenuItem>
          <MenuItem
            disabled={disabled}
            onClick={handleClick('/audioChallenge')}
          >
            <ListItemIcon>
              <HeadsetIcon />
            </ListItemIcon>
            Аудиовызов
          </MenuItem>
          <MenuItem disabled={disabled} onClick={handleClick('/sprint')}>
            <ListItemIcon>
              <DirectionsRunIcon />
            </ListItemIcon>
            Спринт
          </MenuItem>
          <MenuItem disabled={disabled} onClick={handleClick('/designer')}>
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
