import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WrapMain from './WrapMain/WrapMain';
import WrapGame from './WrapGame/WrapGame';
import SideBar from './SideBar/SideBar';
import HomePage from './HomePage/HomePage';
import PromoPage from './PromoPage/PromoPage';
import AboutPage from './AboutPage/AboutPage';
import SavannahPage from './SavannahPage/SavannahPage';
import AudioChallengePage from './AudioChallengePage/AudioChallengePage';
import SprintPage from './SprintPage/SprintPage';
import FindCouplePage from './FindCouplePage/FindCouplePage';
import SettingsPage from './SettingsPage/SettingsPage';
import LoginPage from './LoginPage/LoginPage';
import UserPage from './UserPage/UserPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

function App() {
  const classes = useStyles();

  return (
    <>
      <Switch>
        {/*<Route exact path='/home' component={HomePage} />*/}
        <Route path='/home' component={HomePage} />
        <Route path='/promo' component={PromoPage} />
        <Route path='/settings' component={SettingsPage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/user' component={UserPage} />
        <Route path='/savannah' component={SavannahPage} />
        <Route path='/audioChallenge' component={AudioChallengePage} />
        <Route path='/sprint' component={SprintPage} />
        <Route path='/couple' component={FindCouplePage} />
        {/*<Route component={NotFound} />*/}
        <Redirect from='/' to='/home' />
      </Switch>
      <SideBar />
    </>
  );
}

export default App;
