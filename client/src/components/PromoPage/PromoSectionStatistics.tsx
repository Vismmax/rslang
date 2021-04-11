import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import PromoButtonNext from './PromoButtonNext';
import PromoCard from './PromoCard';
import { routesData } from '../Routes/routesData';

const { statistics, settings } = routesData;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(${statistics.background})`,
      // backgroundImage: dictionaryBg,
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
  }),
);

interface Props {
  onNextPage: () => void;
}

export default function PromoSectionStatistics({ onNextPage }: Props) {
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
              Просматривай статистику и настраивай приложение под себя.
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify='space-evenly' spacing={4}>
              <Grid item xs={6} sm={5} md={4}>
                <PromoCard
                  title={statistics.title}
                  description={statistics.description}
                  image={statistics.image}
                  icon={statistics.icon}
                  href={statistics.route}
                />
              </Grid>
              <Grid item xs={6} sm={5} md={4}>
                <PromoCard
                  title={settings.title}
                  description={settings.description}
                  image={settings.image}
                  icon={settings.icon}
                  href={settings.route}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <PromoButtonNext onClick={onNextPage} />
      </Container>
    </div>
  );
}
