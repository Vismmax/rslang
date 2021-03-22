import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WrapMain from './WrapMain/WrapMain';
import WrapGame from './WrapGame/WrapGame';
import SideBar from './SideBar/SideBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

function App() {
  const classes = useStyles();

  // return <WrapMain />;
  return (
    <>
      <WrapGame />
      <SideBar />
    </>
  );
}

export default App;
