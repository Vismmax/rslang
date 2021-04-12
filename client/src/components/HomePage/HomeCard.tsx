import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    media: {
      width: '100%',
      aspectRatio: '16 / 9',
      minHeight: theme.spacing(30),
      [theme.breakpoints.up('md')]: {
        minHeight: theme.spacing(20),
      },
    },
  }),
);

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
      <CardActionArea component={RouterLink} to={href}>
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
