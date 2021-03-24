import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

interface Props {
  children: JSX.Element;
}

export default function ContainerMain({ children }: Props) {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth='xl' disableGutters>
      {children}
    </Container>
  );
}
