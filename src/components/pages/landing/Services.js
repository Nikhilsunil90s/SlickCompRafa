import React from 'react';
import { Row, Col } from 'react-bootstrap';
import className from 'classnames';
import Section from 'components/common/Section';
import CardService from './CardService';
import SectionHeader from './SectionHeader';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  return (
    <Section bg="light" className="text-center">
      <SectionHeader
        title={t('serviceSectionTitle')}
        subtitle={t('serviceSectionSubTitle')}
      />
      <Row className="mt-6">
        {t('services', { returnObjects: true }).map((service, index) => (
          <Col
            lg={4}
            className={className({ 'mt-6 mt-lg-0': index > 0 })}
            key={index}
          >
            <CardService {...service} />
          </Col>
        ))}
      </Row>
    </Section>
  );
};

export default Services;
