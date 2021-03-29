import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SideBar from './SideBar/SideBar';
import { getUser } from './LoginPage/userSlice';
import Notification from './common/Notification/Notification';
import Routes from './Routes/Routes';

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
