/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import classNames from 'classnames';
import AppContext from 'context/Context';
import { Link } from 'react-router-dom';
import Logo from 'components/common/Logo';
import SearchBox from 'components/navbar/top/SearchBox';
import NavbarTopDropDownMenus from 'components/navbar/top/NavbarTopDropDownMenus';
import { navbarBreakPoint, topNavbarBreakpoint } from 'config';
import autoCompleteInitialItem from 'data/autocomplete/autocomplete';
import LanguageBar from 'helpers/languageBar';

const NavbarAlternative = () => {
  const {
    config: { showBurgerMenu, navbarPosition, navbarCollapsed },
    setConfig
  } = useContext(AppContext);

  const handleBurgerMenu = () => {
    navbarPosition === 'top' && setConfig('navbarCollapsed', !navbarCollapsed);
    (navbarPosition === 'vertical' || navbarPosition === 'combo') &&
      setConfig('showBurgerMenu', !showBurgerMenu);
  };

  return (
    <Navbar
      className="navbar-glass fs--1 navbar-top sticky-kit justify-content-between"
      expand={true}
    >
      <Container>
        <Logo at="navbar-top" width={40} id="topLogo" />

        {navbarPosition === 'top' || navbarPosition === 'combo' ? (
          <Navbar.Collapse
            in={navbarCollapsed}
            className="scrollbar pb-3 pb-lg-0"
          >
            <Nav navbar>
              <NavbarTopDropDownMenus />
            </Nav>
          </Navbar.Collapse>
        ) : (
          false && (
            <Nav
              navbar
              className={`align-items-center d-none d-${topNavbarBreakpoint}-block`}
              as="ul"
            >
              <Nav.Item as="li">
                <SearchBox autoCompleteItem={autoCompleteInitialItem} />
              </Nav.Item>
            </Nav>
          )
        )}
        <div className="d-flex align-items-center">
          <Link className="fs--1 me-2" to={`/`}>
            Login
          </Link>
          <LanguageBar />
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarAlternative;
