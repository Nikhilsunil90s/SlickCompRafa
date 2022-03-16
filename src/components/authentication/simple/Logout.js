import React from 'react';
import LogoutContent from 'components/authentication/LogoutContent';
import { resetStore } from 'dux';

const Logout = () => {
  resetStore();
  return (
    <div className="text-center">
      <LogoutContent />
    </div>
  );
};

export default Logout;
