import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';

import { IWord } from '../../../common/interfaces/WordInterfaces';
import HeaderBoard from './HeaderBoard';
import SeriesBoard from './SeriesBoard';
import SprintButtons from './SprintButtons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    borderTrue: {
      boxShadow: `0 0 30px 10px ${theme.palette.primary.main}`,
    },
    borderFalse: {
      boxShadow: `0 0 30px 10px ${theme.palette.error.main}`,
    },
    header: {},
    main: {
      width: '98vw',
      minWidth: theme.spacing(35),
      maxWidth: theme.spacing(60),
      height: '50vh',
      minHeight: theme.spacing(42),
      justifyContent: 'space-between',
      marginTop: 0,
      marginBottom: 0,
      padding: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        height: '55vh',
        padding: theme.spacing(1),
      },
    },
    card: {
      flexGrow: 2,
      [theme.breakpoints.down('xs')]: {
        flexGrow: 1,
      },
    },
    icon: {
      flexGrow: 1,
    },
    buttons: {
      flexGrow: 1,
      paddingTop: theme.spacing(1),
    },
    iconTrue: {
      borderRadius: '50%',
      boxShadow: `0 0 24px ${theme.palette.primary.main}`,
    },
    iconFalse: {
      borderRadius: '50%',
      boxShadow: `0 0 24px ${theme.palette.error.main}`,
    },
    textCenter: {
      textAlign: 'center',
    },
    image: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }),
);

interface Props {
  word: IWord;
  variant: IWord;
  episode: number;
  series: number;
  showImage: boolean;
  onResult: (res: boolean) => void;
}

export default function SprintCard({
  word,
  variant,
  episode,
  series,
  showImage,
  onResult,
}: Props) {
  const classes = useStyles();
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    setResult(null);
  }, [word]);

  const handleClick = (answer: boolean) => {
    const res = (word.id === variant.id) === answer;
    setResult(res);
    setTimeout(() => {
      onResult(res);
    }, 100);
  };

  return (
    <Paper
      className={clsx(
        classes.root,
        result === true && classes.borderTrue,
        result === false && classes.borderFalse,
      )}
      elevation={5}
    >
      <HeaderBoard episode={episode} series={series} />
      <Grid
        className={classes.main}
        container
        direction='column'
        justify='space-between'
      >
        <Grid
          className={classes.card}
          container
          direction='column'
          justify='space-between'
        >
          <Grid item container justify='center'>
            <SeriesBoard series={series} />
          </Grid>
          {showImage && (
            <Grid item container justify='center'>
              <Avatar
                className={classes.image}
                alt={word?.word}
                src={word?.image}
              />
            </Grid>
          )}
          <Grid item container justify='center'>
            <Typography className={classes.textCenter} variant='h3'>
              {word?.word}
            </Typography>
          </Grid>
          <Grid item container justify='center'>
            <Typography className={classes.textCenter} variant='h4'>
              {variant?.wordTranslate}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          className={classes.icon}
          item
          container
          justify='center'
          alignItems='center'
        >
          <CheckCircleIcon
            className={clsx(
              result === true && classes.iconTrue,
              result === false && classes.iconFalse,
            )}
            fontSize='large'
            color={
              result === true
                ? 'primary'
                : result === false
                ? 'secondary'
                : 'disabled'
            }
          />
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid
          className={classes.buttons}
          item
          container
          justify='center'
          alignItems='center'
        >
          <SprintButtons onClick={handleClick} disable={result !== null} />
        </Grid>
      </Grid>
    </Paper>
  );
}
