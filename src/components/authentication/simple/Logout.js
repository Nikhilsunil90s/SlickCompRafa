import React from 'react';
import LogoutContent from 'components/authentication/LogoutContent';

const Logout = () => (
  <div className="text-center">
    {window.localStorage.clear()}
    <LogoutContent />
  </div>
);

export default Logout;
