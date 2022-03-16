/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import img21 from '../../../assets/img/generic/21.jpeg';
import img22 from '../../../assets/img/generic/22.jpeg';
import img23 from '../../../assets/img/generic/23.jpeg';

const CardService = ({ media, title, description, children }) => {
  let img = '';
  if (media.path === '21') {
    img = img21;
  } else if (media.path === '22') {
    img = img22;
  } else if (media.path === '23') {
    img = img23;
  }
  return (
    <Card className="card-span h-100">
      <div className="card-span-img">
        <img className="img-fluid" src={img} alt={media.alt} />
      </div>
      <Card.Body className="pt-6 pb-4">
        <h5 className="mb-2">{title}</h5>
        {description && <p>{description}</p>}
        {children}
      </Card.Body>
    </Card>
  );
};

CardService.propTypes = {
  media: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    color: PropTypes.string,
    className: PropTypes.string
  }),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node
};

export default CardService;
