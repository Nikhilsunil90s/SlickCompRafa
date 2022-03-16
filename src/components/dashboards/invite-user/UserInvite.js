/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import UserInvitationForm from './UserInvitationForm';
import Section from 'components/common/Section';

const UserInvite = ({ match }) => {
  return (
    <>
      <div className="align-middle mt-3">
        <div className="row mt-5">
          <div className="col-sm-12">
            <Section bg="light" className="py-3">
              <h1 className="fw-bold text-center">Invite User</h1>
              <UserInvitationForm academyId={match.params.academyId} />
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInvite;
