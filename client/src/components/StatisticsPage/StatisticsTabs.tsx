import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import { userStore } from '../LoginPage/userSlice';
import StatisticsToday from './StatisticsToday';
import StatisticsAll from './StatisticsAll';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  // panel: {
  //   overflow: 'hidden',
  // },
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
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {/*{value === index && (*/}
      {/*  <Box p={3}>*/}
      {/*    <Typography>{children}</Typography>*/}
      {/*  </Box>*/}
      {/*)}*/}
      {value === index && children}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function StatisticsTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const { userId } = useSelector(userStore);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // const handleChangeIndex = (index: number) => {
  //   setValue(index);
  // };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          // centered
          aria-label='statistics tabs'
        >
          <Tab label='За сегодня' {...a11yProps(0)} />
          <Tab label='За весь период' {...a11yProps(1)} disabled={!userId} />
        </Tabs>
      </AppBar>
      {/*<SwipeableViews*/}
      {/*  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}*/}
      {/*  index={value}*/}
      {/*  onChangeIndex={handleChangeIndex}*/}
      {/*>*/}
      <TabPanel
        // className={classes.panel}
        value={value}
        index={0}
        dir={theme.direction}
      >
        <StatisticsToday />
      </TabPanel>
      <TabPanel
        // className={classes.panel}
        value={value}
        index={1}
        dir={theme.direction}
      >
        <StatisticsAll />
      </TabPanel>
      {/*</SwipeableViews>*/}
    </div>
  );
}
