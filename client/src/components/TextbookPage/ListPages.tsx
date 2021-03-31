import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CardWord from './CardWord/CardWord';
import {
  getCurrentPage,
  setCurrentPage,
} from '../../common/helpers/localCurrentPage';
import { useDispatch, useSelector } from 'react-redux';
import { activeWords, fetchActiveWords } from './textbookSlice';
import { userStore } from '../LoginPage/userSlice';

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

interface Props {
  group: number;
}

export default function ListPages({ group }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const words = useSelector(activeWords);

  const [page, setPage] = useState(getCurrentPage());

  useEffect(() => {
    dispatch(fetchActiveWords({ group, page }));
  }, []);

  const handleChangePage = (ev: object, pg: number) => {
    setPage(pg - 1);
    setCurrentPage(pg - 1);
    dispatch(fetchActiveWords({ group, page: pg - 1 }));
  };

  return (
    <Container className={classes.root}>
      <div className={classes.page}>
        {/*<CardWord word={tempWord} />*/}
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
        count={30}
        color='primary'
        page={page + 1}
        onChange={handleChangePage}
      />
    </Container>
  );
}
