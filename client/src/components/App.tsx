import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SideBar from './SideBar/SideBar';
import { getUser } from './LoginPage/userSlice';
import Notification from './common/Notification/Notification';
import Routes from './Routes/Routes';
import { loadSettings } from './SettingsPage/settingsSlice';

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
