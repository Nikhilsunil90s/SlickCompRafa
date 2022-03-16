import AppContext from 'context/Context';
import React, { useState, useEffect, useContext } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import ReactCountryFlag from 'react-country-flag';
import i18n from '../i18n';
import { useLocation } from 'react-router';

const LanguageBar = () => {
  const {
    config: { locale }
  } = useContext(AppContext);

  const [flag, setFlag] = useState('US');
  const location = useLocation();
  const [showFlag, setShowFlag] = useState(false);

  useEffect(() => {
    i18n.changeLanguage('en');
  }, [locale]);

  useEffect(() => {
    if (location.pathname === '/') {
      setShowFlag(false);
    } else {
      setShowFlag(true);
    }
    localStorage.getItem('i18nextLng') === 'en' ||
    localStorage.getItem('i18nextLng') === undefined ||
    localStorage.getItem('i18nextLng') === 'en-GB'
      ? setFlag('US')
      : setFlag('ES');
  }, [flag, showFlag]);

  const changeLocale = loc => {
    if (locale !== loc) {
      i18n.changeLanguage(loc);
      loc === 'en' || loc === 'US' ? setFlag('US') : setFlag('ES');
    }
  };

  return (
    <Nav className={'d-lg-block ' + (showFlag ? ' ' : 'd-none')}>
      <NavDropdown
        title={<ReactCountryFlag countryCode={flag} svg />}
        id="basic-nav-dropdown"
        className=""
      >
        <NavDropdown.Item href="#" onClick={() => changeLocale('en')}>
          <ReactCountryFlag countryCode="US" svg /> EN
        </NavDropdown.Item>
        <NavDropdown.Item href="#" onClick={() => changeLocale('es')}>
          <ReactCountryFlag countryCode="ES" svg /> ES
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default LanguageBar;
