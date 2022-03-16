/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';

const AdminControl = ({
  proceedTimer,
  penalizeTimer,
  isStarted,
  onStart,
  onEnd,
  isEnded,
  onBack
}) => {
  return (
    <div className="action-holder">
      <ul className="list-unstyled">
        <li>
          <Button
            type="button"
            className="btn-advantage"
            onClick={() => proceedTimer(1)}
            disabled={!isStarted}
          >
            +1 Sec
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-advantage"
            onClick={() => proceedTimer(10)}
            disabled={!isStarted}
          >
            +10 Sec
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-advantage"
            onClick={() => proceedTimer(60)}
            disabled={!isStarted}
          >
            +60 Sec
          </Button>
        </li>
        {false && (
          <>
            <li>
              <Button type="button">UNDO scoring action</Button>
            </li>
            <li>
              <Button type="button">switch sides</Button>
            </li>
          </>
        )}
      </ul>
      <ul className="list-unstyled">
        <li>
          <Button
            type="button"
            className="btn-penalty"
            onClick={() => penalizeTimer(1)}
            disabled={!isStarted}
          >
            -1 Sec
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-penalty"
            onClick={() => penalizeTimer(10)}
            disabled={!isStarted}
          >
            -10 Sec
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-penalty"
            onClick={() => penalizeTimer(60)}
            disabled={!isStarted}
          >
            -60 Sec
          </Button>
        </li>
        {false && (
          <>
            <li>
              <Button type="button">back to bucket</Button>
            </li>
            <li>
              <Button type="button">back to fightorder</Button>
            </li>
          </>
        )}
        <li>
          {!isEnded && (
            <Button
              type="button"
              onClick={() => (isStarted ? onEnd() : onStart())}
            >
              {isStarted ? 'end game' : 'start game'}
            </Button>
          )}
          {isEnded && (
            <Button type="button" className="btn-grey" onClick={() => onBack()}>
              Back
            </Button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default AdminControl;
