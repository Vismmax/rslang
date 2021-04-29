import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { DifficultyEnum } from '../../common/enums/DifficultyEnum';
import ListPages from './ListPages';
import {
  dictionaryDifficulty,
  saveDictionaryDifficulty,
} from './dictionarySlice';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    flexGrow: 1,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export default function ListTabs() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const difficulty = useSelector(dictionaryDifficulty);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newDifficulty: DifficultyEnum,
  ) => {
    dispatch(saveDictionaryDifficulty(newDifficulty));
  };

  return (
    <div className={classes.root}>
      <AppBar color='transparent' position='static'>
        <Tabs
          variant='fullWidth'
          indicatorColor='primary'
          textColor='primary'
          value={difficulty}
          onChange={handleChange}
        >
          <Tab label='Изучаемые слова' value={DifficultyEnum.work} />
          <Tab label='Сложные слова' value={DifficultyEnum.hard} />
          <Tab label='Удалённые слова' value={DifficultyEnum.delete} />
        </Tabs>
      </AppBar>
      <TabPanel value={difficulty} index={DifficultyEnum.work}>
        <ListPages />
      </TabPanel>
      <TabPanel value={difficulty} index={DifficultyEnum.hard}>
        <ListPages />
      </TabPanel>
      <TabPanel value={difficulty} index={DifficultyEnum.delete}>
        <ListPages />
      </TabPanel>
    </div>
  );
}
