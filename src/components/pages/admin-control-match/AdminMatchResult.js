/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';

const AdminMatchResult = ({ onSave, onFinalBack, isStarted }) => {
  return (
    <div className="action-holder final" disabled={!isStarted}>
      <ul className="list-unstyled">
        <li>
          <Button type="button" className="btn-advantage" onClick={onSave}>
            Save
          </Button>
        </li>
      </ul>
      <ul className="list-unstyled">
        <li>
          <Button type="button" onClick={() => onFinalBack()}>
            back
          </Button>
        </li>
        {false && (
          <>
            <li>
              <Button type="button">back to fightorder</Button>
            </li>
            <li>
              <Button type="button">back to bucket</Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default AdminMatchResult;
