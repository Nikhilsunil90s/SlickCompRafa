import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import logoutImg from 'assets/img/icons/spot-illustrations/45.png';

const LogoutContent = ({ titleTag: TitleTag }) => {
  return (
    <>
      <img
        className="d-block mx-auto mb-4"
        src={logoutImg}
        alt="shield"
        width={100}
      />
      <TitleTag>See you again!</TitleTag>
      <p>
        Thanks for using SlickComp. You are <br className="d-none d-sm-block" />
        now successfully signed out.
      </p>
      <Button
        color="primary"
        size="sm"
        className="mt-3"
        onClick={() => (window.location.href = '/')}
      >
        Go to the main page
      </Button>
    </>
  );
};

LogoutContent.propTypes = {
  layout: PropTypes.string,
  titleTag: PropTypes.string
};

LogoutContent.defaultProps = {
  layout: 'simple',
  titleTag: 'h4'
};

export default LogoutContent;
