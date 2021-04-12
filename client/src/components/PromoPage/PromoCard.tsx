import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import theme from '../../theme/theme';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  media: {
    width: '100%',
    aspectRatio: '16 / 9',
    minHeight: theme.spacing(30),
    [theme.breakpoints.down('md')]: {
      minHeight: theme.spacing(20),
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: theme.spacing(15),
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: theme.spacing(10),
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
});

interface Props {
  image: string;
  title: string;
  description: string;
  icon: JSX.Element;
  href: string;
}

export default function PromoCard({
  image,
  title,
  description,
  icon,
  href,
}: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={RouterLink} to={href}>
        <CardMedia className={classes.media} image={image} title={title} />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant='h5'
            component='h2'
            align='center'
          >
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
