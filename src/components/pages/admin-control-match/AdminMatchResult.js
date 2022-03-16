/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AdminMatchResult = ({ onSave, onFinalBack, isStarted }) => {
  const { t } = useTranslation();

  return (
    <div className="action-holder final" disabled={!isStarted}>
      <ul className="list-unstyled">
        <li>
          <Button type="button" className="btn-advantage" onClick={onSave}>
            {t('adminControlMatch.adminMatchResult.buttonText1')}
          </Button>
        </li>
      </ul>
      <ul className="list-unstyled">
        <li>
          <Button type="button" onClick={() => onFinalBack()}>
            {t('adminControlMatch.adminMatchResult.buttonText2')}
          </Button>
        </li>
        {false && (
          <>
            <li>
              <Button type="button">
                {t('adminControlMatch.adminMatchResult.buttonText3')}
              </Button>
            </li>
            <li>
              <Button type="button">
                {t('adminControlMatch.adminMatchResult.buttonText4')}
              </Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default AdminMatchResult;
