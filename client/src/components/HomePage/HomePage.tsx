import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PageLayout from '../PageLayout/PageLayout';
import HomeProgress from './HomeProgress';
import HomeCard from './HomeCard';
import routesData from '../Routes/routesData';

const {
  textbook,
  dictionary,
  savannah,
  audioChallenge,
  sprint,
  designer,
  statistics,
  settings,
} = routesData;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    background: {
      backgroundColor: theme.palette.info.main,
      backgroundImage: `url(${routesData.home.background})`,
    },
    section: {
      marginBottom: theme.spacing(6),
    },
    header: {
      marginBottom: theme.spacing(3),
      color: 'white',
      textShadow: '0px 0px 20px rgba(0, 0, 0, 1)',
    },
  }),
);

export default function HomePage() {
  const classes = useStyles();

  return (
    <PageLayout background={classes.background}>
      <Typography
        className={classes.header}
        gutterBottom
        variant='h3'
        component='h1'
        align='center'
      >
        RS Lang - английский это просто
      </Typography>

      <section className={classes.section}>
        <HomeProgress />
      </section>

      <section className={classes.section}>
        <Typography
          className={classes.header}
          gutterBottom
          variant='h4'
          component='h2'
          align='center'
        >
          Изучение слов
        </Typography>

        <Grid container justify='space-evenly' spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <HomeCard
              title={textbook.title}
              description={textbook.description}
              image={textbook.image}
              icon={textbook.icon}
              href={textbook.route}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HomeCard
              title={dictionary.title}
              description={dictionary.description}
              image={dictionary.image}
              icon={dictionary.icon}
              href={dictionary.route}
            />
          </Grid>
        </Grid>
      </section>

      <section className={classes.section}>
        <Typography
          className={classes.header}
          gutterBottom
          variant='h4'
          component='h2'
          align='center'
        >
          Тренировка слов
        </Typography>

        <Grid container justify='space-evenly' spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <HomeCard
              title={savannah.title}
              description={savannah.description}
              image={savannah.image}
              icon={savannah.icon}
              href={savannah.route}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HomeCard
              title={audioChallenge.title}
              description={audioChallenge.description}
              image={audioChallenge.image}
              icon={audioChallenge.icon}
              href={audioChallenge.route}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HomeCard
              title={sprint.title}
              description={sprint.description}
              image={sprint.image}
              icon={sprint.icon}
              href={sprint.route}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HomeCard
              title={designer.title}
              description={designer.description}
              image={designer.image}
              icon={designer.icon}
              href={designer.route}
            />
          </Grid>
        </Grid>
      </section>

      <section className={classes.section}>
        <Typography
          className={classes.header}
          gutterBottom
          variant='h4'
          component='h2'
          align='center'
        >
          Статистика и настройки
        </Typography>

        <Grid container justify='space-evenly' spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <HomeCard
              title={statistics.title}
              description={statistics.description}
              image={statistics.image}
              icon={statistics.icon}
              href={statistics.route}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HomeCard
              title={settings.title}
              description={settings.description}
              image={settings.image}
              icon={settings.icon}
              href={settings.route}
            />
          </Grid>
        </Grid>
      </section>
    </PageLayout>
  );
}
