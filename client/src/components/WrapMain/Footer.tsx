import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#f5f5f5',
    },
    main: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    title: {
      display: 'none',
      textTransform: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'inline',
      },
    },
    created: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  }),
);

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Divider />

      <Container className={classes.main}>
        <Button
          href='https://github.com/Vismmax'
          startIcon={<GitHubIcon />}
          size='large'
        >
          <span className={classes.title}>Vismmax</span>
        </Button>

        <Typography className={classes.created}>
          Создано в <time>2021</time>
        </Typography>

        <Button
          href='https://github.com/Vismmax'
          startIcon={<YouTubeIcon />}
          size='large'
        >
          <span className={classes.title}>Demo</span>
        </Button>
      </Container>
    </footer>
  );
}
