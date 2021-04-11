import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import video from '../../assets/promo.mp4';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import PromoButtonNext from './PromoButtonNext';
import HomeCard from '../HomePage/HomeCard';
import PromoCard from './PromoCard';
import { routesData } from '../Routes/routesData';
import Slide from '@material-ui/core/Slide';
// import { Zoom } from '@material-ui/core';
import Zoom from 'react-reveal/Zoom';

const { savannah, audioChallenge, sprint, designer } = routesData;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(${sprint.background})`,
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
      textShadow: '0px 0px 40px rgba(0, 0, 0, 1)',
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
  }),
);

// interface Props {
//   show: boolean;
// }

interface Props {
  show: boolean;
  onNextPage: () => void;
}

export default function PromoSectionGame({ show, onNextPage }: Props) {
  const classes = useStyles();

  // useEffect(() => {
  //   console.log('show: ', show);
  // }, [show]);

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
              Выбирай игру и тренируй слова.
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify='space-evenly' spacing={4}>
              <Grid item xs={6} sm={4} md={3}>
                {/*<Zoom when={show} exit={false} duration={show ? 3000 : -1}>*/}
                <PromoCard
                  title={savannah.title}
                  description={savannah.description}
                  image={savannah.image}
                  icon={savannah.icon}
                  href={savannah.route}
                />
                {/*</Zoom>*/}
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <PromoCard
                  title={audioChallenge.title}
                  description={audioChallenge.description}
                  image={audioChallenge.image}
                  icon={audioChallenge.icon}
                  href={audioChallenge.route}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <PromoCard
                  title={sprint.title}
                  description={sprint.description}
                  image={sprint.image}
                  icon={sprint.icon}
                  href={sprint.route}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <PromoCard
                  title={designer.title}
                  description={designer.description}
                  image={designer.image}
                  icon={designer.icon}
                  href={designer.route}
                />
              </Grid>
            </Grid>
          </Grid>
          {/*<Grid item></Grid>*/}
        </Grid>
        <PromoButtonNext onClick={onNextPage} />
      </Container>
    </div>
  );
}