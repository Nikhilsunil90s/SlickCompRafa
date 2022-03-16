/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { useLocation, Link } from 'react-router-dom';
import { Nav, Navbar, Row, Col, Dropdown, NavDropdown } from 'react-bootstrap';
import { navbarBreakPoint, topNavbarBreakpoint } from 'config';
import AppContext from 'context/Context';
import Flex from 'components/common/Flex';
import Logo from 'components/common/Logo';
import NavbarVerticalMenu from './NavbarVerticalMenu';
import ToggleButton from './ToggleButton';
import { academyRoutes, fighterRoutes } from 'routes/routes';
import { capitalize } from 'helpers/utils';
import NavbarTopDropDownMenus from 'components/navbar/top/NavbarTopDropDownMenus';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const NavbarVertical = () => {
  const isAcademy = useSelector(state => state.auth.isAcademy);
  const {
    config: {
      navbarPosition,
      navbarStyle,
      isNavbarVerticalCollapsed,
      showBurgerMenu
    }
  } = useContext(AppContext);

  const { t } = useTranslation();
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  const { pathname } = useLocation();

  useEffect(() => {
    if (isNavbarVerticalCollapsed) {
      HTMLClassList.add('navbar-vertical-collapsed');
    }
    return () => {
      HTMLClassList.remove('navbar-vertical-collapsed-hover');
    };
  }, [isNavbarVerticalCollapsed, HTMLClassList]);

  //Control mouseEnter event
  let time = null;
  const handleMouseEnter = () => {
    if (isNavbarVerticalCollapsed) {
      time = setTimeout(() => {
        HTMLClassList.add('navbar-vertical-collapsed-hover');
      }, 100);
    }
  };
  const handleMouseLeave = () => {
    clearTimeout(time);
    HTMLClassList.remove('navbar-vertical-collapsed-hover');
  };

  const navbarLabel = label => (
    <Row className="mt-3 mb-2 navbar-vertical-label-wrapper">
      <Col xs="auto" className="navbar-vertical-label navbar-vertical-label">
        {label}
      </Col>
      <Col className="ps-0">
        <hr className="mb-0 navbar-vertical-divider"></hr>
      </Col>
    </Row>
  );
  const route = isAcademy
    ? t('academyDashboardMenuItems', { returnObjects: true })
    : t('fighterDashboardMenuItems', { returnObjects: true });

  return (
    <Navbar
      expand={navbarBreakPoint}
      className={classNames('navbar-vertical', {
        [`navbar-${navbarStyle}`]: navbarStyle !== 'transparent'
      })}
      variant="light"
    >
      <Flex alignItems="center">
        <ToggleButton />
        <Logo at="navbar-vertical" width={40} />
      </Flex>
      <Navbar.Collapse
        in={showBurgerMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        expanded="true"
      >
        <div className="navbar-vertical-content scrollbar">
          <Nav className="flex-column" as="ul">
            <div key={route.label}>
              {!route.labelDisable && navbarLabel(capitalize(route.label))}
              <NavbarVerticalMenu routes={route.children} />
            </div>
          </Nav>

          <>
            {navbarPosition === 'combo' && (
              <div className={`d-${topNavbarBreakpoint}-none`}>
                <div className="navbar-vertical-divider">
                  <hr className="navbar-vertical-hr my-2" />
                </div>
                <Nav navbar>
                  <NavbarTopDropDownMenus />
                </Nav>
              </div>
            )}
          </>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarVertical;
