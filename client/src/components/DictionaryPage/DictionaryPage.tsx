import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import PageLayout from '../PageLayout/PageLayout';
import ContainerMain from '../PageLayout/ContainerMain';
import ToolBar from '../TextbookPage/ToolBar/ToolBar';
import ListGroups from '../TextbookPage/ListGroups';
import ListPages from '../TextbookPage/ListPages';
import ListTabs from './ListTabs';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

export default function DictionaryPage() {
  const classes = useStyles();

  return (
    <PageLayout>
      <ContainerMain>
        <div className={classes.root}>
          <ToolBar title='Словарь' />
          <ListGroups ListGroupItem={ListTabs} />
        </div>
      </ContainerMain>
    </PageLayout>
  );
}
