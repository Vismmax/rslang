import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';

import PromoButtonNext from './PromoButtonNext';
import videoBg from '../../assets/video.webp';
import video from '../../assets/video.mp4';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: theme.palette.text.secondary,
      backgroundImage: `url(${videoBg})`,
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
    item: {
      '& > div': {
        height: '100%',
      },
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
    video: {
      width: 800,
      height: 600,
      [theme.breakpoints.down('sm')]: {
        width: 640,
        height: 480,
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
  }),
);

interface Props {
  show: boolean;
  onNextPage: () => void;
}

export default function PromoSectionVideo({ show, onNextPage }: Props) {
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
              Видео обзор приложения
            </Typography>
          </Grid>
          <Grid item container justify='center'>
            <div className={classes.video}>
              <ReactPlayer
                url={video}
                width='100%'
                height='100%'
                controls
                playing={show}
              />
            </div>
          </Grid>
        </Grid>
        <PromoButtonNext onClick={onNextPage} />
      </Container>
    </div>
  );
}
