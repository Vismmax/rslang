import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      [theme.breakpoints.down('md')]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  }),
);

interface Props {
  children: JSX.Element;
  className?: string;
}

export default function ContainerMain({ children, className = '' }: Props) {
  const classes = useStyles();

  return (
    <Container className={`${classes.root} ${className}`} maxWidth='xl'>
      {children}
    </Container>
  );
}
