/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import Typed from 'react-typed';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bg1 from 'assets/img/generic/bg-1.jpg';
import bjj_tournament from 'assets/img/generic/bjj.png';
import Section from 'components/common/Section';
import AppContext from 'context/Context';

const Hero = () => {
  const {
    config: { isDark }
  } = useContext(AppContext);

  return (
    <Section
      className="bg-dark pt-8 pb-4 light"
      position="center bottom"
      overlay
    >
      <Row className="justify-content-center align-items-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
        <Col
          md={11}
          lg={8}
          xl={4}
          className="pb-7 pb-xl-9 text-center text-xl-start"
        >
          <Button
            as={Link}
            variant="outline-danger"
            className="mb-4 fs--1 border-2 rounded-pill"
            to="#!"
          >
            <span className="me-2" role="img" aria-label="Gift">
              🎁
            </span>
            Create your first event for free
          </Button>
          <h1 className="text-white fw-light">
            Bring
            <Typed
              strings={['organization', 'scoreboard', 'elegance', 'speed']}
              typeSpeed={40}
              backSpeed={50}
              className="fw-bold ps-2"
              loop
            />
            <br />
            to your tournament
          </h1>
          <p className="lead text-white opacity-75">
            THE WORLD'S BEST BJJ TOURNAMENT SOFTWARE FOR COMBAT SPORTS
          </p>
          <Button
            as={Link}
            variant="outline-light"
            size="lg"
            className="border-2 rounded-pill mt-4 fs-0 py-2"
            to="#!"
          >
            Start creating your event
            <FontAwesomeIcon icon="play" transform="shrink-6 down-1 right-5" />
          </Button>
        </Col>
        <Col
          xl={{ span: 7, offset: 1 }}
          className="align-self-end mt-4 mt-xl-0"
        >
          <Link to="/" className="img-landing-banner">
            <img
              className="img-fluid"
              src={isDark ? bjj_tournament : bjj_tournament}
              alt=""
            />
          </Link>
        </Col>
      </Row>
    </Section>
  );
};

export default Hero;
