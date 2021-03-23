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
    main: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      width: '100%',
    },
  }),
);

interface Props {
  children: JSX.Element;
}

export default function WrapMain({ children }: Props) {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth='xl' disableGutters>
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </Container>
  );
}
