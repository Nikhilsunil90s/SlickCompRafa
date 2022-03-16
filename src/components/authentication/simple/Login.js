import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Flex from 'components/common/Flex';
import LoginForm from 'components/authentication/LoginForm';
import AthleteLoginForm from 'components/authentication/AthleteLoginForm';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [key, setKey] = useState('academy');
  const { t } = useTranslation();

  return (
    <div className="login-block">
      <Flex justifyContent="between" alignItems="center" className="mb-2">
        <h5>{t('landingRightSideNavItems.loginTitle')}</h5>
        {/* <p className="fs--1 text-600 mb-0">
        or <Link to="/authentication/simple/register">Create an account</Link>
      </p> */}
      </Flex>
      <Tabs id="logiTabs" activeKey={key} onSelect={k => setKey(k)}>
        <Tab
          eventKey="academy"
          title={t('landingRightSideNavItems.tab1Item')}
          theme="dark"
        >
          <LoginForm />
        </Tab>
        <Tab
          eventKey="athlete"
          title={t('landingRightSideNavItems.tab2Item')}
          theme="dark"
        >
          <AthleteLoginForm />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Login;
