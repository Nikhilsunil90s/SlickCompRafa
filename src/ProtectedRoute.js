/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProp = state => state.auth;
const ProtectedRoute = ({ component: Component, loggedIn, ...restOfProps }) => {
  const isAuthenticated = loggedIn;
  return (
    <Route
      {...restOfProps}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default connect(mapStateToProp)(ProtectedRoute);
