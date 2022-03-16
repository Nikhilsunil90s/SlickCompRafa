/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Modal,
  Nav,
  OverlayTrigger,
  Tooltip,
  NavDropdown
} from 'react-bootstrap';
import Registration from 'components/authentication/simple/Registration';
import Login from 'components/authentication/simple/Login';
import { connect } from 'react-redux';

const breakpoint = 'lg';

const mapStateToProp = state => state.auth;
const LandingRightSideNavItem = ({ loggedIn }) => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const { t } = useTranslation();
  return (
    <Nav navbar className="ms-auto">
      {false && (
        <>
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="dashboardTooltip">Dashboard</Tooltip>}
              >
                <div>
                  <FontAwesomeIcon
                    icon="chart-pie"
                    id="dashboardTooltip"
                    className={`d-none d-${breakpoint}-inline-block`}
                  />
                </div>
              </OverlayTrigger>
              <span className={`d-${breakpoint}-none`}>Dashboard</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/documentation/getting-started">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="dashboardTooltip">Documentation</Tooltip>}
              >
                <div>
                  <FontAwesomeIcon
                    icon="book"
                    id="documentationTooltip"
                    className={`d-none d-${breakpoint}-inline-block`}
                  />
                </div>
              </OverlayTrigger>
              <span className={`d-${breakpoint}-none`}>Documentation</span>
            </Nav.Link>
          </Nav.Item>
        </>
      )}
      {!loggedIn && (
        <NavDropdown
          title={t('landingRightSideNavItems.loginTitle')}
          align="end"
        >
          <Card className="navbar-card-login shadow-none">
            <Card.Body className="fs--1 fw-normal p-3">
              <Login />
            </Card.Body>
          </Card>
        </NavDropdown>
      )}
      {loggedIn && (
        <Nav.Item>
          <Nav.Link as={Link} to="/dashboard/profile">
            {t('landingRightSideNavItems.dashboardTitle')}
          </Nav.Link>
        </Nav.Item>
      )}
      {false && (
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/user-registration/1"
            // onClick={() => setShowRegistrationModal(!showRegistrationModal)}
          >
            Register
          </Nav.Link>
          <Modal
            show={showRegistrationModal}
            centered
            onHide={() => setShowRegistrationModal(false)}
          >
            <Modal.Body className="p-0">
              <Card>
                <Card.Body className="fs--1 fw-normal p-4">
                  <Registration />
                </Card.Body>
              </Card>
            </Modal.Body>
          </Modal>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default connect(mapStateToProp)(LandingRightSideNavItem);
