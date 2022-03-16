/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Profile from 'components/dashboards/fighter/profile';
import Edit from 'components/dashboards/user/edit';
import ProtectedRoute from '../ProtectedRoute';
import MatchResult from 'components/dashboards/match-result';
import Matches from 'components/dashboards/fighter/matches';

const FighterRoutes = () => (
  <Switch>
    <ProtectedRoute path="/dashboard/profile" exact component={Profile} />
    <ProtectedRoute path="/dashboard/user/edit/:uuid" exact component={Edit} />
    <ProtectedRoute
      path="/dashboard/user-matches/:academyId/:userId"
      exact
      component={Matches}
    />
    <ProtectedRoute
      path="/dashboard/match-result/:academyId/:matchid"
      exact
      component={MatchResult}
    />
    <Redirect to="/errors/404" />
  </Switch>
);
export default FighterRoutes;
