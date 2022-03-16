import React, { useState } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import experiences from 'data/experiences';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Experience from '../Experience';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExperienceForm from './ExperienceForm';

const ExperiencesSettings = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Card className="mt-3">
      <FalconCardHeader title="Experiences" />
      <Card.Body className="fs--1 bg-light">
        <div>
          <Flex
            alignItems="center"
            className="mb-4 text-primary cursor-pointer fs-0"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            <span className="circle-dashed">
              <FontAwesomeIcon icon="plus" />
            </span>
            <span className="ms-3">Add new experience</span>
          </Flex>
          <Collapse in={collapsed}>
            <div>
              <ExperienceForm />
              <div className="border-dashed-bottom my-3" />
            </div>
          </Collapse>
        </div>
        {experiences.map((experience, index) => (
          <Experience
            key={experience.id}
            experience={experience}
            isLast={index === experiences.length - 1}
          />
        ))}
      </Card.Body>
    </Card>
  );
};

export default ExperiencesSettings;
