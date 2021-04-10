import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from '../../theme/theme';

const useStyles = makeStyles({
  root: {
    // maxWidth: 580,
  },
  media: {
    width: '100%',
    aspectRatio: '16 / 9',
    minHeight: theme.spacing(30),
    [theme.breakpoints.up('md')]: {
      minHeight: theme.spacing(20),
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

export default function HomeCard({
  image,
  title,
  description,
  icon,
  href,
}: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={href}>
        <CardMedia className={classes.media} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
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
