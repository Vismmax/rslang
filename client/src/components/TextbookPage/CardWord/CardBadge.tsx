import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    badge: {
      position: 'absolute',
      right: theme.spacing(4.5),
      top: theme.spacing(2),
    },
  }),
);

export default function CardBadge() {
  const classes = useStyles();

  return (
    <Badge className={classes.badge} badgeContent='Сложное' color='secondary' />
  );
}
