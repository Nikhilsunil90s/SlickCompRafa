import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import bg2 from 'assets/img/generic/bg-2.jpg';
import Section from 'components/common/Section';
import { useTranslation } from 'react-i18next';

const Cta = () => {
  const { t } = useTranslation();
  return (
    <Section overlay image={bg2} position="center top" className="light">
      <Row className="justify-content-center text-center">
        <Col lg={8}>
          <p className="fs-3 fs-sm-4 text-white">{t('ctaMajor')}</p>
          <Button
            variant="outline-light"
            size="lg"
            className="border-2 rounded-pill mt-4 fs-0 py-2"
          >
            {t('ctaBtn')}
          </Button>
        </Col>
      </Row>
    </Section>
  );
};

export default Cta;
