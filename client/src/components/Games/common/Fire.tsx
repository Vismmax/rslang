import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import orange from '@material-ui/core/colors/orange';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Flip from 'react-reveal/Flip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    icon: {
      fontSize: theme.typography.h6.fontSize,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.h5.fontSize,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.h4.fontSize,
      },
    },
  }),
);

const StyledRating = withStyles({
  iconEmpty: {
    color: orange[900],
  },
  iconFilled: {
    color: 'rgba(0, 0, 0, 0.1)',
  },
})(Rating);

interface Props {
  max: number;
  value: number;
}

export default function Fire({ max, value }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledRating
        max={max}
        value={max - value}
        readOnly
        icon={
          <Flip>
            <WhatshotIcon className={classes.icon} />
          </Flip>
        }
      />
    </div>
  );
}
