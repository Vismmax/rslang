import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './Header/Header';
import Footer from './Footer';

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
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
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
  children: JSX.Element | JSX.Element[] | null;
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
      <main className={`${classes.main} ${background}`}>
        <Container className={`${classes.container} ${className}`}>
          <>{children}</>
        </Container>
      </main>
      <Footer />
    </Container>
  );
}
