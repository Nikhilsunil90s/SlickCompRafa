/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';

const ParticipantMatchResult = ({ declareWinner }) => {
  return (
    <div className="action-holder alt">
      <div className="inner-holder">
        <strong className="title">won by:</strong>
        <ul className="list-unstyled">
          <li>
            <Button type="button" onClick={() => declareWinner('points')}>
              points
            </Button>
          </li>
          <li>
            <Button type="button" onClick={() => declareWinner('submission')}>
              submission
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
            disqualification
          </Button>
        </li>
        <li>
          <Button type="button" onClick={() => declareWinner('walkover')}>
            walkover
          </Button>
        </li>
        <li>
          <Button type="button" onClick={() => declareWinner('decision')}>
            decision
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default ParticipantMatchResult;
