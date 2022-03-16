/* eslint-disable react/prop-types */
import React from 'react';
import { Col } from 'react-bootstrap';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';

const Participant = ({
  participantData,
  winner,
  result,
  cardColor,
  method
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Col xs="auto d-flex align-items-center flex-1">
        <div className="align-items-start d-flex flex-column">
          {winner && (
            <strong className="winner-flag">{t('matchResults.winner')}</strong>
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

              {winner && method && (
                <span className="academy-name d-block text-uppercase">
                  {t('matchResults.winnerBy')} {method}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="score-count d-flex justify-content-between mt-3 visible-tablet">
          <div className="box d-flex flex-1 justify-content-center flex-column align-items-center">
            <span className="title d-block">{t('matchResults.advantage')}</span>
            <span className="count d-block">{result.advantage}</span>
          </div>
          <div className="box d-flex flex-1 justify-content-center flex-column align-items-center">
            <span className="title d-block">{t('matchResults.penalty')}</span>
            <span className="count d-block">{result.penaty}</span>
          </div>
        </div>
      </Col>
      <Col xs="auto" className="justify-content-end d-flex p-0">
        <div className="score-count d-flex flex-column justify-content-between hidden-tablet">
          <div className="box d-flex flex-1 justify-content-center flex-column align-items-center">
            <span className="title d-block">{t('matchResults.advantage')}</span>
            <span className="count d-block">{result.advantage}</span>
          </div>
          <div className="box d-flex flex-1 justify-content-center flex-column align-items-center">
            <span className="title d-block">{t('matchResults.penalty')}</span>
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
