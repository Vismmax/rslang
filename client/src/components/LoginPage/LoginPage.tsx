import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';

import PageLayout from '../PageLayout/PageLayout';
import Login from './Login';
import Registration from './Registration';
import { userStore } from './userSlice';
import { backRouteStore, setBackRoute } from '../Routes/routeSlice';
import routesData from '../Routes/routesData';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: theme.palette.text.secondary,
    backgroundImage: `url(${routesData.login.background})`,
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
    width: theme.spacing(62),
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`login-tabpanel-${index}`}
      aria-labelledby={`login-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `login-tab-${index}`,
    'aria-controls': `login-tabpanel-${index}`,
  };
}

export default function LoginPage() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { userId } = useSelector(userStore);
  const history = useHistory();
  const dispatch = useDispatch();
  const backRoute = useSelector(backRouteStore);

  useEffect(() => {
    return () => {
      dispatch(setBackRoute(''));
    };
  }, []);

  useEffect(() => {
    if (userId) {
      if (backRoute) {
        history.push(backRoute);
      } else {
        history.goBack();
      }
      dispatch(setBackRoute(''));
    }
  }, [userId]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const handleCancel = () => {
    if (backRoute) {
      history.push('/');
    } else {
      history.goBack();
    }
    dispatch(setBackRoute(''));
  };

  return (
    <PageLayout background={classes.background}>
      <div className={classes.root}>
        <div className={classes.tabs}>
          <AppBar position='static' color='default'>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              variant='fullWidth'
              aria-label='login tabs'
            >
              <Tab label='Вход' {...a11yProps(0)} />
              <Tab label='Регистрация' {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Login onCancel={handleCancel} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Registration onCancel={handleCancel} />
            </TabPanel>
          </SwipeableViews>
        </div>
      </div>
    </PageLayout>
  );
}
