import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearDictionaryWords,
  countPages,
  dictionaryPage,
  dictionaryWords,
  fetchDictionaryWords,
  isLoadingDictionaryWords,
  saveDictionaryPage,
} from './dictionarySlice';
import CardDictionary from './CardDictionary/CardDictionary';
import Spinner from '../common/Spinner';
import EmptyPage from '../common/EmptyPage';

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
      paddingBottom: theme.spacing(3),
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
  const loading = useSelector(isLoadingDictionaryWords);
  const words = useSelector(dictionaryWords);
  const count = useSelector(countPages);
  const page = useSelector(dictionaryPage);

  const matches = useMediaQuery('(min-width:420px)');

  useEffect(() => {
    dispatch(fetchDictionaryWords());
    return () => {
      dispatch(clearDictionaryWords());
    };
  }, []);

  const handleChangePage = (ev: object, pg: number) => {
    dispatch(saveDictionaryPage(pg - 1));
    const anchor = document.querySelector('#app-header');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Container className={classes.root}>
      <Spinner open={loading} inner={true} />
      {!words.length && !loading && (
        <EmptyPage text='В этом разделе еще нет слов' />
      )}
      <div className={classes.page}>
        <Grid container direction='column' spacing={2}>
          {words.map((word) => (
            <Grid key={word.id} item>
              <CardDictionary word={word} />
            </Grid>
          ))}
        </Grid>
      </div>
      {words.length > 20 && (
        <Pagination
          className={classes.paginator}
          // color='primary'
          size={matches ? 'medium' : 'small'}
          count={count}
          page={page + 1}
          onChange={handleChangePage}
        />
      )}
    </Container>
  );
}
