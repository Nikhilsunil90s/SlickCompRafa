/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import Banner from './banner';
import coverSrc from 'assets/img/generic/4.jpg';
import avatarDefault from 'assets/img/team/2.jpg';
import { Col, Row } from 'react-bootstrap';
import UserProfileFields from './user-profile-fields';
import AcademyProfileFields from './academy-profile-fields';
import ExperiencesSettings from 'components/pages/user/settings/ExperiencesSettings';
import EducationSettings from 'components/pages/user/settings/EducationSettings';
import AccountSettings from 'components/pages/user/settings/AccountSettings';
import BillingSettings from 'components/pages/user/settings/BillingSettings';
import ChangePassword from 'components/pages/user/settings/ChangePassword';
import getProfile from 'api/user/get-profile';
import getAcademy from 'api/academy/get-academy';
import { useSelector } from 'react-redux';
import DangerZone from 'components/pages/user/settings/DangerZone';
import { useParams } from 'react-router-dom';

const Edit = () => {
  const [avatar, setAvatar] = useState(null);
  let { uuid, isAcademy } = useParams();
  const academyId = useSelector(state => state.auth.academyId);
  const academyUuid = useSelector(state => state.auth.uuid);
  const loadAvatar = useCallback(async () => {
    let data = null;
    if (isAcademy) {
      data = await getAcademy(academyId);
    } else {
      data = await getProfile(uuid);
    }
    setAvatar(data[0].avatarUrl);
  }, []);
  useEffect(() => {
    loadAvatar();
  }, []);
  return (
    <>
      <Banner>
        <Banner.Header
          coverSrc={coverSrc}
          avatar={avatar || avatarDefault}
          className="mb-8"
          isAcademy={isAcademy}
          uuid={isAcademy ? academyUuid : uuid}
          onDone={loadAvatar}
        />
      </Banner>
      <Row className="g-3">
        <Col lg={8}>
          {isAcademy ? (
            <AcademyProfileFields id={academyId} />
          ) : (
            <UserProfileFields uuid={uuid} />
          )}
          {false && (
            <>
              <ExperiencesSettings />
              <EducationSettings />
            </>
          )}
        </Col>
        <Col lg={4}>
          <div className="sticky-sidebar">
            <AccountSettings />
            {false && (
              <>
                <BillingSettings />
                <ChangePassword />
                <DangerZone />
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Edit;
