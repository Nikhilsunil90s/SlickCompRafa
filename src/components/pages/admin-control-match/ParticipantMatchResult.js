/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ParticipantMatchResult = ({ declareWinner }) => {
  const { t } = useTranslation();

  return (
    <div className="action-holder alt">
      <div className="inner-holder">
        <strong className="title">
          {t('adminControlMatch.participantMatchResult.title')}
        </strong>
        <ul className="list-unstyled">
          <li>
            <Button type="button" onClick={() => declareWinner('points')}>
              {t('adminControlMatch.participantMatchResult.buttonText1')}
            </Button>
          </li>
          <li>
            <Button type="button" onClick={() => declareWinner('submission')}>
              {t('adminControlMatch.participantMatchResult.buttonText2')}
            </Button>
          </li>
        </ul>
      </div>
      <ul className="list-unstyled">
        <li>
          <Button
            type="button"
            onClick={() => declareWinner('disqualification')}
          >
            {t('adminControlMatch.participantMatchResult.buttonText3')}
          </Button>
        </li>
        <li>
          <Button type="button" onClick={() => declareWinner('walkover')}>
            {t('adminControlMatch.participantMatchResult.buttonText4')}
          </Button>
        </li>
        <li>
          <Button type="button" onClick={() => declareWinner('decision')}>
            {t('adminControlMatch.participantMatchResult.buttonText5')}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default ParticipantMatchResult;
