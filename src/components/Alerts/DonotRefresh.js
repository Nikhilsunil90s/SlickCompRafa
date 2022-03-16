import React, { useState } from 'react';
import { Alert, Modal } from 'react-bootstrap';
const DonotRefresh = () => {
  const [show, setShow] = useState(true);
  return (
    <Modal show={show} onHide={() => setShow(false)} contentClassName="border">
      <Alert
        variant="danger"
        className="m-0"
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>
          Don't Refresh the Page or all the data will be Lost{' '}
        </Alert.Heading>
        <p>While the match is running, make sure you don't refresh the page</p>
      </Alert>
    </Modal>
  );
};

export default DonotRefresh;
