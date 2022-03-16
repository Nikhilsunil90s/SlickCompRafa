import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Flex from 'components/common/Flex';
import LoginForm from 'components/authentication/LoginForm';
import AthleteLoginForm from 'components/authentication/AthleteLoginForm';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const Login = () => {
  const [key, setKey] = useState('academy');
  return (
    <div className="login-block">
      <Flex justifyContent="between" alignItems="center" className="mb-2">
        <h5>Log in</h5>
        {/* <p className="fs--1 text-600 mb-0">
        or <Link to="/authentication/simple/register">Create an account</Link>
      </p> */}
      </Flex>
      <Tabs id="logiTabs" activeKey={key} onSelect={k => setKey(k)}>
        <Tab eventKey="academy" title="Academy" theme="dark">
          <LoginForm />
        </Tab>
        <Tab eventKey="athlete" title="Athlete" theme="dark">
          <AthleteLoginForm />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Login;
