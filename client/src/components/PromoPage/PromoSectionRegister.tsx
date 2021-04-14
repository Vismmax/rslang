import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import brown from '@material-ui/core/colors/brown';
import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';

import Footer from '../PageLayout/Footer';
import routesData from '../Routes/routesData';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Fab from '@material-ui/core/Fab';
import { useSelector } from 'react-redux';
import { userStore } from '../LoginPage/userSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: brown[700],
      backgroundImage: `url(${routesData.promo.background})`,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      width: '100%',
      height: '100%',
      color: 'white',
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(3),
      },
    },
    grid: {
      height: '100%',
    },
    header: {
      fontWeight: theme.typography.fontWeightBold,
      textShadow: '0px 0px 20px rgba(0, 0, 0, 1)',
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.h3.fontSize,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.h4.fontSize,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    footerWrap: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
    },
    footer: {
      backgroundColor: 'rgba(245, 245, 245, 0.5)',
    },
    buttonUp: {
      position: 'absolute',
      bottom: theme.spacing(7),
      right: theme.spacing(2),
    },
  }),
);

interface Props {
  show: boolean;
  onSclollTop: () => void;
}

export default function PromoSectionRegister({ show, onSclollTop }: Props) {
  const classes = useStyles();
  const user = useSelector(userStore);

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Grid
          className={classes.grid}
          container
          direction='column'
          justify='space-evenly'
          alignItems='center'
        >
          <Grid item>
            <Typography
              className={classes.header}
              variant='h2'
              component='h2'
              align='center'
            >
              {/*И всё это бесплатно!*/}
              {show && (
                <Bounce right cascade>
                  И всё это бесплатно!
                </Bounce>
              )}
            </Typography>
          </Grid>
          <Grid item>
            {show && (
              <Bounce right cascade delay={700}>
                <Typography
                  className={classes.header}
                  variant='h2'
                  component='h2'
                  align='center'
                >
                  Начни изучать английский прямо сегодня.
                </Typography>
              </Bounce>
            )}
          </Grid>
          <Grid item>
            {show && !user.userId && (
              <Flip delay={1500}>
                <Button
                  size='large'
                  variant='contained'
                  color='secondary'
                  component={RouterLink}
                  to='/login'
                >
                  Зарегистрироваться
                </Button>
              </Flip>
            )}
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Container>
      <div className={classes.footerWrap}>
        <Footer className={classes.footer} />
      </div>
      <Fab
        className={classes.buttonUp}
        color='secondary'
        size='small'
        onClick={onSclollTop}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </div>
  );
}
