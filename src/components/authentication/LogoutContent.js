import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import logoutImg from 'assets/img/icons/spot-illustrations/45.png';
import { useTranslation } from 'react-i18next';

const LogoutContent = ({ titleTag: TitleTag }) => {
  const { t } = useTranslation();

  return (
    <>
      <img
        className="d-block mx-auto mb-4"
        src={logoutImg}
        alt="shield"
        width={100}
      />
      <TitleTag>{t('logoutContent.title')}</TitleTag>
      <p>
        {t('logoutContent.content1')} <br className="d-none d-sm-block" />
        {t('logoutContent.content2')}
      </p>
      <Button
        color="primary"
        size="sm"
        className="mt-3"
        onClick={() => (window.location.href = '/')}
      >
        {t('logoutContent.button')}
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
