import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './Header/Header';
import Footer from './Footer';
import SideBar from '../SideBar/SideBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      //   backgroundImage: 'url("/img/bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
    },
  }),
);

export default function WrapMain() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth='xl' disableGutters>
      <Header />
      {/*<SideBar />*/}
      <div />
      <Footer />
    </Container>
  );
}
