import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useHotkeys } from 'react-hotkeys-hook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(20),
      opacity: 0.8,
    },
  }),
);

interface Props {
  isOpenCard: boolean;
  onClick: () => void;
}

export default function ButtonNext({ isOpenCard, onClick }: Props) {
  const classes = useStyles();

  const handleClick = () => {
    onClick();
  };

  useHotkeys('enter,space,right', handleClick, [isOpenCard, onClick]);

  return (
    <Button className={classes.root} variant='contained' onClick={handleClick}>
      {isOpenCard ? <ArrowRightAltIcon /> : 'Не знаю'}
    </Button>
  );
}
