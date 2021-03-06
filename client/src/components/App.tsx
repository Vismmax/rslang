import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import SideBar from './SideBar/SideBar';
import Notification from './common/Notification/Notification';
import Routes from './Routes/Routes';
import { getUser } from './LoginPage/userSlice';
import { loadSettings } from './SettingsPage/settingsSlice';
import { loadActivePage } from './TextbookPage/textbookSlice';
import { loadDictionaryPage } from './DictionaryPage/dictionarySlice';
import { loadStatistics } from './StatisticsPage/statisticsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(loadSettings());
    dispatch(loadActivePage());
    dispatch(loadDictionaryPage());
    dispatch(loadStatistics());
  }, []);

  return (
    <>
      <Routes />
      <SideBar />
      <Notification />
    </>
  );
}

export default App;
