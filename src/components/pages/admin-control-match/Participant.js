/* eslint-disable react/prop-types */
import React from 'react';
import { Col } from 'react-bootstrap';
import ReactCountryFlag from 'react-country-flag';
import AdminParticipantControl from './AdminParticipantControl';
import ParticipantMatchResult from './ParticipantMatchResult';

const Participant = ({
  participantData,
  cardColor,
  scores,
  isEnded,
  isWon,
  ...rest
}) => {
  return (
    <>
      <Col xs="auto d-flex align-items-center flex-1">
        <div className="align-items-start d-flex flex-column">
          {scores.winner && (
            <strong className="winner-flag">Winner by {scores.by}</strong>
          )}
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
              <span className="academy-name d-block text-uppercase">
                {participantData.academy.name}
              </span>
            </div>
          </div>
          {!isWon &&
            (isEnded ? (
              <ParticipantMatchResult {...rest} />
            ) : (
              <AdminParticipantControl {...rest} />
            ))}
        </div>
      </Col>
      <Col xs="auto" className="justify-content-end d-flex p-0">
        <div className="score-count d-flex flex-column justify-content-between">
          <div className="box d-flex flex-1 justify-content-center flex-column align-items-center">
            <span className="title d-block">Advantage</span>
            <span className="count d-block">{scores.advantage}</span>
          </div>
          <div className="box d-flex flex-1 justify-content-center flex-column align-items-center">
            <span className="title d-block">Penalty</span>
            <span className="count d-block">{scores.penalties}</span>
          </div>
        </div>
        <div
          className="score-box d-flex justify-content-center align-items-center"
          style={{ backgroundColor: cardColor }}
        >
          {scores.points}
        </div>
      </Col>
    </>
  );
};

export default Participant;
