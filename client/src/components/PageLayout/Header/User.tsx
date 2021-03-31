import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logoutUser, userStore } from '../../LoginPage/userSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(3),
    },
    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    // title: {
    //   flexGrow: 1,
    // },
  }),
);

export default function User() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userStore);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setAnchorEl(null);
    history.push('/');
  };

  return (
    <div className={classes.root}>
      {user.userId ? (
        <div>
          <IconButton
            edge='end'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
            color='inherit'
          >
            <Avatar alt={user.name} src={user.avatar} />
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
            <MenuItem component={RouterLink} to='/user'>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              Профиль
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              Выход
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <Button color='inherit' component={RouterLink} to='/login'>
          Вход
        </Button>
      )}
    </div>
  );
}
