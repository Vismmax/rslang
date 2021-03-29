import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import PromoPage from '../PromoPage/PromoPage';
import AboutPage from '../AboutPage/AboutPage';
import SavannahPage from '../Games/SavannahPage/SavannahPage';
import AudioChallengePage from '../Games/AudioChallengePage/AudioChallengePage';
import SprintPage from '../Games/SprintPage/SprintPage';
import FindCouplePage from '../Games/FindCouplePage/FindCouplePage';
import SettingsPage from '../SettingsPage/SettingsPage';
import LoginPage from '../LoginPage/LoginPage';
import UserPage from '../UserPage/UserPage';
import PrivateRoute from '../Routes/PrivateRoute';
import TextbookPage from '../TextbookPage/TextbookPage';
import DictionaryPage from '../DictionaryPage/DictionaryPage';
import StatisticsPage from '../StatisticsPage/StatisticsPage';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route path='/promo' component={PromoPage} />
        <Route path='/textbook' component={TextbookPage} />
        <Route path='/dictionary' component={DictionaryPage} />
        <Route path='/savannah' component={SavannahPage} />
        <Route path='/audioChallenge' component={AudioChallengePage} />
        <Route path='/sprint' component={SprintPage} />
        <Route path='/couple' component={FindCouplePage} />
        <Route path='/statistics' component={StatisticsPage} />
        <PrivateRoute path='/settings' component={SettingsPage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/user' component={UserPage} />
        {/*<Route component={NotFound} />*/}
        <Redirect from='/' to='/home' />
      </Switch>
    </>
  );
}
