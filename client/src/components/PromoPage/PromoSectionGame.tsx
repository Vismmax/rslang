import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import PromoButtonNext from './PromoButtonNext';
import PromoCard from './PromoCard';
import { routesData } from '../Routes/routesData';
import Bounce from 'react-reveal/Bounce';

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

interface Props {
  show: boolean;
  onNextPage: () => void;
}

export default function PromoSectionGame({ show, onNextPage }: Props) {
  const classes = useStyles();

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
              {/*Выбирай игру и тренируй слова.*/}
              {show && (
                <Bounce top cascade>
                  Выбирай игру и тренируй слова.
                </Bounce>
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify='space-evenly' spacing={4}>
              <Grid item xs={6} sm={4} md={3}>
                {show && (
                  <Bounce bottom>
                    <PromoCard
                      title={savannah.title}
                      description={savannah.description}
                      image={savannah.image}
                      icon={savannah.icon}
                      href={savannah.route}
                    />
                  </Bounce>
                )}
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                {show && (
                  <Bounce bottom delay={100}>
                    <PromoCard
                      title={audioChallenge.title}
                      description={audioChallenge.description}
                      image={audioChallenge.image}
                      icon={audioChallenge.icon}
                      href={audioChallenge.route}
                    />
                  </Bounce>
                )}
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                {show && (
                  <Bounce bottom delay={200}>
                    <PromoCard
                      title={sprint.title}
                      description={sprint.description}
                      image={sprint.image}
                      icon={sprint.icon}
                      href={sprint.route}
                    />
                  </Bounce>
                )}
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                {show && (
                  <Bounce bottom delay={300}>
                    <PromoCard
                      title={designer.title}
                      description={designer.description}
                      image={designer.image}
                      icon={designer.icon}
                      href={designer.route}
                    />
                  </Bounce>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <PromoButtonNext onClick={onNextPage} />
      </Container>
    </div>
  );
}
