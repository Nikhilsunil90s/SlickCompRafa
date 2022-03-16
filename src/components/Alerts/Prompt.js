/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Prompt = ({ prompt, onYes, onNo }) => {
  const { t } = useTranslation();

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
            {t('adminControlMatch.scoreCard.promptYes')}
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
            {t('adminControlMatch.scoreCard.promptNo')}
          </Button>
        </li>
      </ul>
    </Modal>
  );
};

export default Prompt;
