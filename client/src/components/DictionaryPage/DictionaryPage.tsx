import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import PageLayout from '../PageLayout/PageLayout';
import ToolBar from '../TextbookPage/ToolBar/ToolBar';
import ListGroups from '../TextbookPage/ListGroups';
import ListTabs from './ListTabs';
import routesData from '../Routes/routesData';
import ButtonUp from '../common/ButtonUp';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  background: {
    backgroundImage: `url(${routesData.dictionary.background})`,
    backgroundAttachment: 'fixed',
  },
  wrap: {
    padding: 0,
  },
}));

export default function DictionaryPage() {
  const classes = useStyles();

  return (
    <PageLayout className={classes.wrap} background={classes.background}>
      <div className={classes.root}>
        <ToolBar title='Словарь' />
        <ListGroups ListGroupItem={ListTabs} />
        <ButtonUp />
      </div>
    </PageLayout>
  );
}
