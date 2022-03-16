/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const CardService = ({ media, title, description, children }) => (
  <Card className="card-span h-100">
    <div className="card-span-img">
      <img className="img-fluid" src={media.path} alt={media.alt} />
    </div>
    <Card.Body className="pt-6 pb-4">
      <h5 className="mb-2">{title}</h5>
      {description && <p>{description}</p>}
      {children}
    </Card.Body>
  </Card>
);

CardService.propTypes = {
  media: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
    color: PropTypes.string.isRequired,
    className: PropTypes.string
  }),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node
};

export default CardService;
