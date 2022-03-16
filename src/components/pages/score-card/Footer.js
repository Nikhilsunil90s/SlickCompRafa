/* eslint-disable react/prop-types */
import React from 'react';
import { Col } from 'react-bootstrap';
import moment from 'moment';

const Footer = ({ data, time }) => {
  const timer = moment.utc(time * 1000).format('mm:ss');
  return (
    <>
      <Col xs="auto d-flex">
        <header className="header">
          <h5 className="text-uppercase">{data && data.matchType}</h5>
          {data && `${data.matchGender} / ${data.seniority} / ${data.weight}`}
        </header>
      </Col>
      <Col xs="auto d-flex">
        <div className="timer">{timer}</div>
      </Col>
    </>
  );
};

export default Footer;
