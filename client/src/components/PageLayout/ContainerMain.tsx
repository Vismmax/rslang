import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      // flexDirection: 'column',
      flexGrow: 1,
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
    <Container
      className={`${classes.root} ${className}`}
      maxWidth='xl'
      // disableGutters
    >
      {children}
    </Container>
  );
}