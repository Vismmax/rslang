import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import video from '../../assets/promo.mp4';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import PromoButtonNext from './PromoButtonNext';
import HomeCard from '../HomePage/HomeCard';
import { routesData } from '../Routes/routesData';
import PromoCard from './PromoCard';

const { textbook, dictionary } = routesData;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(${dictionary.background})`,
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

export default function PromoSectionTextbook({ onNextPage }: Props) {
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
              Открывай учебник и выбирай нужные слова, все выбранные слова
              окажуться в словаре.
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify='space-evenly' spacing={4}>
              <Grid item xs={6} sm={5} md={4}>
                <PromoCard
                  title={textbook.title}
                  description={textbook.description}
                  image={textbook.image}
                  icon={textbook.icon}
                  href={textbook.route}
                />
              </Grid>
              <Grid item xs={6} sm={5} md={4}>
                <PromoCard
                  title={dictionary.title}
                  description={dictionary.description}
                  image={dictionary.image}
                  icon={dictionary.icon}
                  href={dictionary.route}
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