/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AdminControl = ({
  proceedTimer,
  penalizeTimer,
  isStarted,
  isReady,
  onStart,
  onEnd,
  isEnded,
  onBack,
  isStopped,
  onStop,
  onResume
}) => {
  const { t } = useTranslation();

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
              <Button type="button">
                {t('adminControlMatch.adminControl.buttonText1')}
              </Button>
            </li>
            <li>
              <Button type="button">
                {t('adminControlMatch.adminControl.buttonText2')}
              </Button>
            </li>
          </>
        )}
        <li>
          {isStarted && (
            <Button
              type="button"
              onClick={() => (isStopped ? onResume() : onStop())}
            >
              {isStopped ? 'resume game' : 'pause game'}
            </Button>
          )}
        </li>
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
              <Button type="button">
                {t('adminControlMatch.adminControl.buttonText3')}
              </Button>
            </li>
            <li>
              <Button type="button">
                {t('adminControlMatch.adminControl.buttonText4')}
              </Button>
            </li>
          </>
        )}
        <li>
          {!isEnded && (
            <Button
              type="button"
              disabled={!isReady}
              onClick={() => (isStarted ? onEnd() : onStart())}
            >
              {isStarted
                ? t('adminControlMatch.adminControl.buttonText5b')
                : t('adminControlMatch.adminControl.buttonText5a')}
            </Button>
          )}
          {isEnded && (
            <Button type="button" className="btn-grey" onClick={() => onBack()}>
              {t('adminControlMatch.adminControl.buttonText6')}
            </Button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default AdminControl;
