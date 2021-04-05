import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ListPages from './ListPages';
import { useDispatch, useSelector } from 'react-redux';
import { activeGroup, saveActiveGroup } from './textbookSlice';
import clsx from 'clsx';
import { useStyles } from './ListGroupsStyle';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      className={clsx(
        value === index ? classes.tabpanel : '',
        // @ts-ignore
        classes[`tabpanel${index}`],
      )}
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

interface Props {
  savePage?: boolean;
  ListGroupItem: typeof ListPages;
}

export default function ListGroups({ savePage = true, ListGroupItem }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const group = useSelector(activeGroup);

  const handleChange = (event: React.ChangeEvent<{}>, newPage: number) => {
    dispatch(saveActiveGroup(newPage));
  };

  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabs}
        classes={{ indicator: classes.indicator }}
        orientation='vertical'
        value={group}
        onChange={handleChange}
        aria-label='Groups tabs'
      >
        {new Array(6).fill(1).map((e, id) => (
          <Tab
            // @ts-ignore
            className={classes[`tab${id}`]}
            classes={{ root: classes.tabRoot }}
            key={id}
            label={
              <span>
                <span className={classes.tabName}>Глава </span>
                {id + 1}
              </span>
            }
            icon={<BookmarkIcon />}
          />
        ))}
      </Tabs>
      {new Array(6).fill(1).map((e, id) => (
        <TabPanel key={id} value={group} index={id}>
          <ListGroupItem group={id} />
        </TabPanel>
      ))}
    </div>
  );
}
