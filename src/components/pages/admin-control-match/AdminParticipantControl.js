/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';

const AdminParticipantControl = ({
  addPoints,
  subtractPoints,
  advantage,
  disadvantage,
  penalize,
  depenalize,
  isStarted
}) => {
  return (
    <div className="action-holder">
      <ul className="list-unstyled">
        <li>
          <Button
            type="button"
            className="btn-advantage"
            onClick={() => addPoints(1)}
            disabled={!isStarted}
          >
            +1
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-advantage"
            onClick={() => addPoints(2)}
            disabled={!isStarted}
          >
            +2
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-advantage"
            onClick={() => addPoints(3)}
            disabled={!isStarted}
          >
            +3
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-advantage"
            onClick={() => addPoints(4)}
            disabled={!isStarted}
          >
            +4
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-advantage"
            onClick={advantage}
            disabled={!isStarted}
          >
            +A
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-advantage"
            onClick={penalize}
            disabled={!isStarted}
          >
            +P
          </Button>
        </li>
        {false && (
          <li>
            <Button type="button">STALLING</Button>
          </li>
        )}
      </ul>
      <ul className="list-unstyled">
        <li>
          {' '}
          <Button
            type="button"
            className="btn-penalty"
            onClick={() => subtractPoints(1)}
            disabled={!isStarted}
          >
            -1
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-penalty"
            onClick={() => subtractPoints(2)}
            disabled={!isStarted}
          >
            -2
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-penalty"
            onClick={() => subtractPoints(3)}
            disabled={!isStarted}
          >
            -3
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-penalty"
            onClick={() => subtractPoints(4)}
            disabled={!isStarted}
          >
            -4
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-penalty"
            onClick={disadvantage}
            disabled={!isStarted}
          >
            -A
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn-penalty"
            onClick={depenalize}
            disabled={!isStarted}
          >
            -P
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default AdminParticipantControl;
