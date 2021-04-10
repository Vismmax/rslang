import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import PageLayout from '../PageLayout/PageLayout';
import ContainerMain from '../PageLayout/ContainerMain';
import ToolBar from './ToolBar/ToolBar';
import ListPages from './ListPages';
import ListGroups from './ListGroups';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  wrap: {
    padding: 0,
  },
}));

export default function TextbookPage() {
  const classes = useStyles();

  return (
    <PageLayout className={classes.wrap}>
      {/*<ContainerMain>*/}
      <div className={classes.root}>
        <ToolBar title='Учебник' />
        <ListGroups ListGroupItem={ListPages} />
      </div>
      {/*</ContainerMain>*/}
    </PageLayout>
  );
}
