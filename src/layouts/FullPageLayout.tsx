/* eslint-disable no-unused-vars */
import React from 'react';
import ForgetPasswordPage from 'components/pages/forgot-password';
import NewUserRegistration from 'components/pages/new-user-registration';
import ResetPasswordPage from 'components/pages/reset-password';
// import Landing from 'components/pages/landing/Landing';
import { Switch, Route, Redirect } from 'react-router-dom';
import Logout from 'components/authentication/simple/Logout';
import NavbarAlternative from 'components/pages/landing/NavbarAlternative';

const FullPageLayout = () => {
  return (
    <>
      <NavbarAlternative />
      <Switch>
        <Route
          path="/forgot-password/:userType?"
          component={ForgetPasswordPage}
        />
        <Route
          path="/change-password/:uuid/:md5"
          component={ResetPasswordPage}
        />
        <Route path="/logout" exact component={Logout} />
        <Route path="/user-registration/:id" component={NewUserRegistration} />
        <Redirect to="/errors/404" />
      </Switch>
    </>
  );
};

export default FullPageLayout;
