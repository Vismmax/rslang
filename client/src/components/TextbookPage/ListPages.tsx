import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

import CardWord from './CardWord/CardWord';
import Spinner from '../common/Spinner';
import EmptyPage from '../common/EmptyPage';
import {
  activePage,
  activeWords,
  clearTextbookWords,
  fetchActiveWords,
  idLoadingWord,
  loadingTextbookWords,
  saveActivePage,
} from './textbookSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
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

interface Props {
  group: number;
}

export default function ListPages({ group }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(loadingTextbookWords);
  const loadingWord = useSelector(idLoadingWord);
  const words = useSelector(activeWords);
  const page = useSelector(activePage);

  const matches = useMediaQuery('(min-width:420px)');

  useEffect(() => {
    dispatch(fetchActiveWords());
    return () => {
      dispatch(clearTextbookWords());
    };
  }, []);

  const handleChangePage = (ev: object, pg: number) => {
    dispatch(saveActivePage(pg - 1));
    const anchor = document.querySelector('#app-header');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Container className={classes.root}>
      <Spinner open={loading && !loadingWord} inner={true} />
      {!words.length && !loading && (
        <EmptyPage text='На этой странице больше нет слов' />
      )}
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
        size={matches ? 'medium' : 'small'}
        count={30}
        page={page + 1}
        onChange={handleChangePage}
      />
    </Container>
  );
}
