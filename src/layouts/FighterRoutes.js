/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Profile from 'components/dashboards/fighter/profile';
import ProtectedRoute from 'ProtectedRoute';

const FighterRoutes = () => (
  <Switch>
    <ProtectedRoute path="/dashboard/profile" exact component={Profile} />
    <Redirect to="/errors/404" />
  </Switch>
);
export default FighterRoutes;
