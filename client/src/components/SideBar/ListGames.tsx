import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EcoIcon from '@material-ui/icons/Eco';
import HeadsetIcon from '@material-ui/icons/Headset';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

interface Props {
  closeSideBar: () => void;
}

export default function ListGames({ closeSideBar }: Props) {
  const classes = useStyles();
  const [openGames, setOpenGames] = React.useState(true);

  const handleClickGames = () => {
    setOpenGames(!openGames);
  };

  return (
    <List
      component='nav'
      aria-labelledby='games-list-subheader'
      className={classes.root}
    >
      <ListItem button onClick={handleClickGames}>
        <ListItemIcon>
          <SportsEsportsIcon />
        </ListItemIcon>
        <ListItemText primary='Игры' />
        {openGames ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openGames} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            className={classes.nested}
            component={RouterLink}
            to='/savannah'
            onClick={closeSideBar}
          >
            <ListItemIcon>
              <EcoIcon />
            </ListItemIcon>
            <ListItemText primary='Саванна' />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={RouterLink}
            to='/audioChallenge'
            onClick={closeSideBar}
          >
            <ListItemIcon>
              <HeadsetIcon />
            </ListItemIcon>
            <ListItemText primary='Аудиовызов' />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={RouterLink}
            to='/sprint'
            onClick={closeSideBar}
          >
            <ListItemIcon>
              <DirectionsRunIcon />
            </ListItemIcon>
            <ListItemText primary='Спринт' />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={RouterLink}
            to='/designer'
            onClick={closeSideBar}
          >
            <ListItemIcon>
              <ViewModuleIcon />
            </ListItemIcon>
            <ListItemText primary='Конструктор' />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
