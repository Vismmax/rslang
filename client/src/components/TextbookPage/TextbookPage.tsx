import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import PageLayout from '../PageLayout/PageLayout';
import ToolBar from './ToolBar/ToolBar';
import ListPages from './ListPages';
import ListGroups from './ListGroups';
import routesData from '../Routes/routesData';
import ButtonUp from '../common/ButtonUp';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  background: {
    backgroundColor: theme.palette.text.secondary,
    backgroundImage: `url(${routesData.textbook.background})`,
    backgroundAttachment: 'fixed',
  },
  wrap: {
    padding: 0,
  },
}));

export default function TextbookPage() {
  const classes = useStyles();

  return (
    <PageLayout className={classes.wrap} background={classes.background}>
      <div className={classes.root}>
        <ToolBar title='Учебник' />
        <ListGroups ListGroupItem={ListPages} />
        <ButtonUp />
      </div>
    </PageLayout>
  );
}
