import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { getTimeDuration } from 'helpers/utils';
import VerifiedBadge from 'components/common/VerifiedBadge';

const Experience = ({ experience, isLast }) => {
  const { logo, title, company, startDate, endDate, location, verified } =
    experience;

  const duration = getTimeDuration(
    dayjs(startDate, 'MMMM YYYY'),
    dayjs(endDate, 'MMMM YYYY'),
    'Y [yrs] M [mon]'
  );
  return (
    <Flex>
      <Link to="#!">
        <Image fluid src={logo} width={56} />
      </Link>
      <div className="flex-1 position-relative ps-3">
        <h6 className="fs-0 mb-0">
          {title}
          {verified && <VerifiedBadge />}
        </h6>
        <p className="mb-1">
          <Link to="#!">{company}</Link>
        </p>
        <p className="text-1000 mb-0">
          {`${dayjs(startDate, 'MMMM YYYY').format('MMM YYYY')} - ${dayjs(
            endDate,
            'MMMM YYYY'
          ).format('MMM YYYY')} • ${duration}`}
        </p>
        <p className="text-1000 mb-0">{location}</p>
        {!isLast && <div className="border-dashed-bottom my-3" />}
      </div>
    </Flex>
  );
};
Experience.propTypes = {
  experience: PropTypes.shape({
    logo: PropTypes.string,
    title: PropTypes.string,
    company: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    location: PropTypes.string,
    verified: PropTypes.bool
  }),
  isLast: PropTypes.bool
};
export default Experience;
