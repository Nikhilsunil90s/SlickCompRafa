/* eslint-disable react/prop-types */
import React from 'react';
import { Col } from 'react-bootstrap';
import ReactCountryFlag from 'react-country-flag';

const Participant = ({
  participantData,
  winner,
  result,
  cardColor,
  method
}) => {
  return (
    <>
      <Col xs="auto d-flex align-items-center flex-1">
        <div className="align-items-start d-flex flex-column">
          {winner && <strong className="winner-flag">Winner</strong>}
          <div className="d-flex">
            <div className="country-info d-flex flex-column">
              <span className="flag d-flex">
                <ReactCountryFlag countryCode={participantData.country} svg />
              </span>
            </div>
            <div className="user-info d-flex flex-column">
              <strong className="user-name d-flex text-uppercase">
                {participantData.name}
              </strong>

              {winner && method && (
                <span className="academy-name d-block text-uppercase">
                  Winner By {method}
                </span>
              )}
            </div>
          </div>
        </div>
      </Col>
      <Col xs="auto" className="justify-content-end d-flex p-0">
        <div className="score-count d-flex flex-column justify-content-between">
          <div className="box d-flex flex-1 justify-content-center flex-column align-items-center">
            <span className="title d-block">Advantage</span>
            <span className="count d-block">{result.advantage}</span>
          </div>
          <div className="box d-flex flex-1 justify-content-center flex-column align-items-center">
            <span className="title d-block">Penalty</span>
            <span className="count d-block">{result.penaty}</span>
          </div>
        </div>
        <div
          className="score-box d-flex justify-content-center align-items-center"
          style={{ backgroundColor: cardColor }}
        >
          {result.points}
        </div>
      </Col>
    </>
  );
};

export default Participant;
