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
      // backgroundSize: 'cover',
      // backgroundPosition: 'center top',
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      width: '100%',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      width: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
    },
  }),
);

interface Props {
  children: JSX.Element;
  className?: string;
  background?: string;
}

export default function PageLayout({
  children,
  className = '',
  background = '',
}: Props) {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth={false} disableGutters>
      <Header />
      {/*<main className={`${classes.main} ${className}`}>*/}
      <main className={`${classes.main} ${background}`}>
        <Container className={`${classes.container} ${className}`}>
          {children}
        </Container>
      </main>
      <Footer />
    </Container>
  );
}
