import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
// import CardWord from './CardWord';
import {
  getCurrentPage,
  setCurrentPage,
} from '../../common/helpers/localCurrentPage';
import { useDispatch, useSelector } from 'react-redux';
import { activeGroup } from '../TextbookPage/textbookSlice';
import {
  countPages,
  dictionaryPage,
  dictionaryWords,
  fetchDictionaryWords,
  saveDictionaryPage,
} from './dictionarySlice';
import CardWord from '../TextbookPage/CardWord/CardWord';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
    },
    page: {
      flexGrow: 1,
    },
    paginator: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

export default function ListPages() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const words = useSelector(dictionaryWords);
  const count = useSelector(countPages);
  const page = useSelector(dictionaryPage);

  useEffect(() => {
    dispatch(fetchDictionaryWords());
  }, []);

  const handleChangePage = (ev: object, pg: number) => {
    dispatch(saveDictionaryPage(pg - 1));
  };

  return (
    <Container className={classes.root}>
      <div className={classes.page}>
        <Grid container direction='column' spacing={2}>
          {words.map((word) => (
            <Grid key={word.id} item>
              <CardWord word={word} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Pagination
        className={classes.paginator}
        count={count}
        color='primary'
        page={page + 1}
        onChange={handleChangePage}
      />
    </Container>
  );
}
