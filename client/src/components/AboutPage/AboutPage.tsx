import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';

import PageLayout from '../PageLayout/PageLayout';
import routesData from '../Routes/routesData';
import foto from '../../assets/autor.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    background: {
      backgroundColor: theme.palette.warning.dark,
      backgroundImage: `url(${routesData.about.background})`,
    },
    card: {
      padding: theme.spacing(3),
    },
    header: {
      marginBottom: theme.spacing(3),
      color: 'white',
      textShadow: '0px 0px 20px rgba(0, 0, 0, 1)',
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.h4.fontSize,
      },
    },
    foto: {
      width: theme.spacing(24),
      height: theme.spacing(24),
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing(3),
    },
    name: {
      marginBottom: theme.spacing(3),
    },
    link: {
      width: '100%',
      textTransform: 'none',
    },
  }),
);

export default function AboutPage() {
  const classes = useStyles();

  return (
    <PageLayout background={classes.background}>
      <div>
        <Typography
          className={classes.header}
          variant='h3'
          component='h1'
          align='center'
        >
          Наша команда
        </Typography>
        <Grid container justify='center'>
          <Paper className={classes.card} elevation={3}>
            <Avatar
              className={classes.foto}
              alt='Сотниченко Виктор'
              src={foto}
            />
            <Typography
              className={classes.name}
              variant='h5'
              component='h2'
              align='center'
            >
              Сотниченко Виктор
            </Typography>
            <div>
              <Button
                className={classes.link}
                startIcon={<GitHubIcon />}
                href='https://github.com/Vismmax'
              >
                <Typography variant='body1' component='span'>
                  github.com/vismmax
                </Typography>
              </Button>
            </div>
            <div>
              <Button
                className={classes.link}
                startIcon={<MailIcon />}
                href='mailto:vismmax@gmail.com'
              >
                <Typography variant='body1' component='span'>
                  vismmax@gmail.com
                </Typography>
              </Button>
            </div>
          </Paper>
        </Grid>
      </div>
    </PageLayout>
  );
}
