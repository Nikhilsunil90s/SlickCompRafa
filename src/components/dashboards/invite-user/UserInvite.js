/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import UserInvitationForm from './UserInvitationForm';
import Section from 'components/common/Section';
import { useTranslation } from 'react-i18next';

const UserInvite = ({ match }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="align-middle mt-3">
        <div className="row mt-5">
          <div className="col-sm-12">
            <Section bg="light" className="py-3">
              <h5 className="mb-1">{t('inviteUser.heading')}</h5>
              <UserInvitationForm academyId={match.params.academyId} />
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInvite;
