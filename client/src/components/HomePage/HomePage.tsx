import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PageLayout from '../PageLayout/PageLayout';
import { Starter } from '../Games/common/Starter';
import Button from '@material-ui/core/Button';
import { Paper, Slide } from '@material-ui/core';
import ResultGame from '../Games/GameLayout/ResultGame';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      // backgroundImage: 'url("/img/bg.jpg")',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
    },
  }),
);

export default function HomePage() {
  const classes = useStyles();

  return (
    <PageLayout>
      <div>
        <ResultGame open={false} onCancel={() => {}} onReset={() => {}} />
      </div>
    </PageLayout>
  );
}
