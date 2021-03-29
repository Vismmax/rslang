import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PageLayout from '../PageLayout/PageLayout';
import ContainerMain from '../PageLayout/ContainerMain';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ToolBar from './ToolBar/ToolBar';
import ListPages from './ListPages';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  main: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  tabpanel: {
    display: 'flex',
    flexGrow: 1,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

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
      className={value === index ? classes.tabpanel : ''}
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function TextbookPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PageLayout>
      <ContainerMain>
        <div className={classes.root}>
          <ToolBar />
          <div className={classes.main}>
            <Tabs
              orientation='vertical'
              value={value}
              onChange={handleChange}
              aria-label='Groups tabs'
              className={classes.tabs}
            >
              {new Array(6).fill(1).map((e, id) => (
                <Tab
                  label={`Глава ${id}`}
                  icon={<BookmarkIcon />}
                  {...a11yProps(id)}
                />
              ))}
              {/*<Tab label='Глава 1' icon={<BookmarkIcon />} {...a11yProps(0)} />*/}
              {/*<Tab label='Глава 2' icon={<BookmarkIcon />} {...a11yProps(1)} />*/}
              {/*<Tab label='Глава 3' icon={<BookmarkIcon />} {...a11yProps(2)} />*/}
              {/*<Tab label='Глава 4' icon={<BookmarkIcon />} {...a11yProps(3)} />*/}
              {/*<Tab label='Глава 5' icon={<BookmarkIcon />} {...a11yProps(4)} />*/}
              {/*<Tab label='Глава 6' icon={<BookmarkIcon />} {...a11yProps(5)} />*/}
            </Tabs>
            {new Array(6).fill(1).map((e, id) => (
              <TabPanel value={value} index={id}>
                <ListPages group={id} />
              </TabPanel>
            ))}
            {/*<TabPanel value={value} index={0}>*/}
            {/*  Item One*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={1}>*/}
            {/*  Item Two*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={2}>*/}
            {/*  Item Three*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={3}>*/}
            {/*  Item Four*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={4}>*/}
            {/*  Item Five*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={5}>*/}
            {/*  Item Six*/}
            {/*</TabPanel>*/}
          </div>
        </div>
      </ContainerMain>
    </PageLayout>
  );
}
