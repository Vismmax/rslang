import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import video from '../../assets/promo.mp4';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import PromoButtonNext from './PromoButtonNext';
import PromoHeader from './PromoHeader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    video: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      minWidth: '100%',
      minHeight: '100%',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    content: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
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
    },
  }),
);

interface Props {
  onNextPage: () => void;
}

export default function PromoSectionTitle({ onNextPage }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <video className={classes.video} autoPlay muted loop>
        <source src={video} type='video/mp4' />
      </video>
      <PromoHeader />
      <div className={classes.content}>
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
                variant='h1'
                component='h1'
                align='center'
              >
                RS Lang
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                className={classes.header}
                variant='h2'
                component='h2'
                align='center'
              >
                Выучи английский играючи
              </Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
          <PromoButtonNext onClick={onNextPage} />
        </Container>
      </div>
    </div>
  );
}
