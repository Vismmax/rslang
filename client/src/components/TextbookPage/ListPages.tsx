import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';

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

  const [page, setPage] = useState(13);

  const handleChangePage = (ev: object, pg: number) => {
    setPage(pg);
  };

  return (
    <Container className={classes.root}>
      <div className={classes.page}>ddd</div>
      <Pagination
        className={classes.paginator}
        count={30}
        color='primary'
        page={page}
        onChange={handleChangePage}
      />
    </Container>
  );
}
