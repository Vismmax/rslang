import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import EcoIcon from '@material-ui/icons/Eco';
import HeadsetIcon from '@material-ui/icons/Headset';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

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

export default function Games() {
  const classes = useStyles();
  const [openGames, setOpenGames] = React.useState(true);

  const handleClick = () => {
    setOpenGames(!openGames);
  };

  return (
    <>
      <List
        component='nav'
        aria-labelledby='games-list-subheader'
        subheader={
          <ListSubheader component='div' id='games-list-subheader'>
            Игры
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem button>
          <ListItemIcon>
            <EcoIcon />
          </ListItemIcon>
          <ListItemText primary='Саванна' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HeadsetIcon />
          </ListItemIcon>
          <ListItemText primary='Аудиовызов' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DirectionsRunIcon />
          </ListItemIcon>
          <ListItemText primary='Спринт' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DirectionsRunIcon />
          </ListItemIcon>
          <ListItemText primary='Своя игра' />
        </ListItem>
      </List>

      <List
        component='nav'
        aria-labelledby='games-list-subheader'
        className={classes.root}
      >
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <SportsEsportsIcon />
          </ListItemIcon>
          <ListItemText primary='Игры' />
          {openGames ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openGames} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <EcoIcon />
              </ListItemIcon>
              <ListItemText primary='Саванна' />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <HeadsetIcon />
              </ListItemIcon>
              <ListItemText primary='Аудиовызов' />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <DirectionsRunIcon />
              </ListItemIcon>
              <ListItemText primary='Спринт' />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <DirectionsRunIcon />
              </ListItemIcon>
              <ListItemText primary='Своя игра' />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );
}
