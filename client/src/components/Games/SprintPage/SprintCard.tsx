import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { IWord } from '../../../common/interfaces/WordInterfaces';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';
import HeaderBoard from './HeaderBoard';
import SeriesBoard from './SeriesBoard';
import Divider from '@material-ui/core/Divider';
import SprintButtons from './SprintButtons';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // minWidth: theme.spacing(60),
      // minHeight: theme.spacing(60),
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      // paddingTop: theme.spacing(8),
    },
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

  useEffect(() => {
    console.log('result use: ', result);
  }, [result]);

  const handleClick = (answer: boolean) => {
    console.log('answer: ', answer);
    console.log('word.id === variant.id: ', word.id, variant.id);
    const res = (word.id === variant.id) === answer;
    console.log('res answer: ', res);
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
        // justify='center'
        justify='space-between'
        // spacing={5}
      >
        <Grid
          className={classes.card}
          container
          direction='column'
          // justify='center'
          justify='space-between'
          // spacing={5}
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
