import { makeStyles, Theme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import brown from '@material-ui/core/colors/brown';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  tabpanel: {
    display: 'flex',
    flexGrow: 1,
  },
  indicator: {
    display: 'none',
  },
  tabs: {
    borderRight: 'none',
    [theme.breakpoints.down('lg')]: {
      width: theme.spacing(15),
      minWidth: theme.spacing(15),
    },
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(9),
      minWidth: theme.spacing(9),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(5),
      minWidth: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(4),
      minWidth: theme.spacing(4),
    },
  },
  tabRoot: {
    transition: 'opacity 0.7s',
    [theme.breakpoints.down('lg')]: {
      width: theme.spacing(15),
      minWidth: theme.spacing(15),
    },
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(9),
      minWidth: theme.spacing(9),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(5),
      minWidth: theme.spacing(5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(4),
      minWidth: theme.spacing(4),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  tabName: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  tabpanel0: {
    boxShadow: `inset 0px 0px 20px ${grey[500]}`,
  },
  tab0: {
    backgroundColor: grey[300],
    '&:hover': {
      opacity: 0.8,
    },
  },
  tabpanel1: {
    boxShadow: `inset 0px 0px 20px ${green[500]}`,
  },
  tab1: {
    backgroundColor: green[300],
    '&:hover': {
      opacity: 0.8,
    },
  },
  tabpanel2: {
    boxShadow: `inset 0px 0px 20px ${blue[500]}`,
  },
  tab2: {
    backgroundColor: blue[300],
    '&:hover': {
      opacity: 0.8,
    },
  },
  tabpanel3: {
    boxShadow: `inset 0px 0px 20px ${yellow[500]}`,
  },
  tab3: {
    backgroundColor: yellow[300],
    '&:hover': {
      opacity: 0.8,
    },
  },
  tabpanel4: {
    boxShadow: `inset 0px 0px 20px ${red[500]}`,
  },
  tab4: {
    backgroundColor: red[300],
    '&:hover': {
      opacity: 0.8,
    },
  },
  tabpanel5: {
    boxShadow: `inset 0px 0px 20px ${brown[500]}`,
  },
  tab5: {
    backgroundColor: brown[300],
    '&:hover': {
      opacity: 0.8,
    },
  },
}));
