/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Background from 'components/common/Background';
import Avatar from 'components/common/Avatar';
import classNames from 'classnames';
import AvatarUploader from 'components/common/AvatarUploader';
import { useParams } from 'react-router-dom';

const Banner = ({ avatar, coverSrc, className, isAcademy, uuid, onDone }) => {
  return (
    <Card.Header
      className={classNames(className, 'position-relative min-vh-25 mb-7')}
    >
      <Background image={coverSrc} className="rounded-3 rounded-bottom-0" />
      <div className="profile-img-uploader avatar-profile">
        <Avatar size="5xl" src={avatar} mediaClass="img-thumbnail shadow-sm" />
        <AvatarUploader
          url={`https://yvoijqsuhd.execute-api.us-east-1.amazonaws.com/development/slickcomp-images/${
            isAcademy ? 'academy' : 'user'
          }/${uuid}.png`}
          onDone={onDone}
        />
      </div>
    </Card.Header>
  );
};

const ProfileBannerBody = ({ children }) => {
  return <Card.Body>{children}</Card.Body>;
};

const ProfileBanner = ({ children }) => {
  return <Card className="mb-3">{children}</Card>;
};

ProfileBanner.Header = Banner;
ProfileBanner.Body = ProfileBannerBody;

Banner.propTypes = {
  avatar: PropTypes.string.isRequired,
  coverSrc: PropTypes.string.isRequired,
  className: PropTypes.string
};

ProfileBannerBody.propTypes = {
  children: PropTypes.node.isRequired
};

ProfileBanner.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProfileBanner;
