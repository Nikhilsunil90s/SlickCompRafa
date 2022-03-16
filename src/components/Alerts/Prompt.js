/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
const Prompt = ({ prompt, onYes, onNo }) => {
  const [show, setShow] = useState(true);

  return (
    <Modal show={show} onHide={() => setShow(false)} contentClassName="border">
      <h3 className="modal-header">{prompt}</h3>
      <ul className="list-unstyled actionable-buttons">
        <li>
          <Button
            type="button"
            onClick={() => {
              setShow(false);
              onYes();
            }}
          >
            Yes
          </Button>
        </li>
        <li>
          <Button
            type="button"
            onClick={() => {
              setShow(false);
              onNo();
            }}
          >
            No
          </Button>
        </li>
      </ul>
    </Modal>
  );
};

export default Prompt;
