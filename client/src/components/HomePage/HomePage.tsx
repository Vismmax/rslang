import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PageLayout from '../PageLayout/PageLayout';
import { Starter } from '../Games/common/Starter';
import Button from '@material-ui/core/Button';
import { Paper, Slide } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      // backgroundImage: 'url("/img/bg.jpg")',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
    },

    paper: {
      zIndex: 1,
      position: 'relative',
      margin: theme.spacing(1),

      width: 400,
      height: 400,
      backgroundColor: 'red',
    },
    svg: {
      width: 100,
      height: 100,
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },
    test: {
      width: '100%',
      height: 500,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

export default function HomePage() {
  const classes = useStyles();

  const [show, setShow] = useState(false);
  const [text, setText] = useState('start1');
  const [time, setTime] = useState(1000);
  const [direct, setDirect] = useState<
    'left' | 'right' | 'up' | 'down' | undefined
  >('up');

  useEffect(() => {
    console.log('time: ', time);
  }, [time]);

  return (
    <PageLayout>
      <div>
        <Button onClick={() => setShow(!show)}>click</Button>
        <Button onClick={() => setDirect('up')}>up</Button>
        <Button onClick={() => setDirect('down')}>down</Button>
        <Button onClick={() => setDirect('left')}>left</Button>
        <Button onClick={() => setDirect('right')}>right</Button>
        <span>direct: {direct}</span>
        <div className={classes.test}>
          <Slide
            exit={true}
            direction={direct}
            in={show}
            timeout={time}
            mountOnEnter
            unmountOnExit
            onExit={() => {
              console.log('onExit');
            }}
            onEnter={() => {
              console.log('onEnter');
            }}
            onEntering={() => {
              console.log('onEntering');
            }}
            onEntered={() => {
              console.log('onEntered');
            }}
          >
            <Paper elevation={4} className={classes.paper}>
              {text}
              {/*<svg className={classes.svg}>*/}
              {/*  <polygon*/}
              {/*    points='0,100 50,00, 100,100'*/}
              {/*    className={classes.polygon}*/}
              {/*  />*/}
              {/*</svg>*/}
            </Paper>
          </Slide>
        </div>
        {/*<Slide*/}
        {/*  exit={false}*/}
        {/*  direction='up'*/}
        {/*  in={show}*/}
        {/*  timeout={time}*/}
        {/*  mountOnEnter*/}
        {/*  unmountOnExit*/}
        {/*  onExit={() => {*/}
        {/*    console.log('onExit');*/}
        {/*  }}*/}
        {/*  onEnter={() => {*/}
        {/*    console.log('onEnter');*/}
        {/*  }}*/}
        {/*  onEntering={() => {*/}
        {/*    console.log('onEntering');*/}
        {/*  }}*/}
        {/*  onEntered={() => {*/}
        {/*    console.log('onEntered');*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Paper elevation={4} className={classes.paper}>*/}
        {/*    {text}*/}
        {/*    <svg className={classes.svg}>*/}
        {/*      <polygon*/}
        {/*        points='0,100 50,00, 100,100'*/}
        {/*        className={classes.polygon}*/}
        {/*      />*/}
        {/*    </svg>*/}
        {/*  </Paper>*/}
        {/*</Slide>*/}
      </div>
    </PageLayout>
  );
}
