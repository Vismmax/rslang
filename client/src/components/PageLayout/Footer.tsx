import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import school from '../../assets/rs_school.svg';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#f5f5f5',
    },
    main: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.up('lg')]: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
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
      textAlign: 'center',
    },
    school: {
      width: theme.spacing(7),
    },
  }),
);

interface Props {
  className?: string;
}

export default function Footer({ className = '' }: Props) {
  const classes = useStyles();

  return (
    <footer className={`${classes.root} ${className}`}>
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

        <Link className={classes.school} href='https://rs.school/react'>
          <img src={school} alt='rs school' />
        </Link>
      </Container>
    </footer>
  );
}
