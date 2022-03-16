import React, { useState } from 'react';
import { Alert, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DonotRefresh = () => {
  const [show, setShow] = useState(true);
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={() => setShow(false)} contentClassName="border">
      <Alert
        variant="danger"
        className="m-0"
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>{t('dontRefreshPopUp.head1')} </Alert.Heading>
        <p>{t('dontRefreshPopUp.head2')}</p>
      </Alert>
    </Modal>
  );
};

export default DonotRefresh;
