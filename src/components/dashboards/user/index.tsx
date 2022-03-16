/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useGetUsersQuery } from 'api/user';
import { useParams } from 'react-router-dom';

const User = () => {
  const { userId, academyId } =
    useParams<{ userId: string; academyId: string }>();
  const { data: participants } = useGetUsersQuery(academyId);
  const [participantData, setParticipantData] = useState([]);

  // const getParticipantData = () => {
  //   return participants.filter(
  //     (participant: any) => userId === participant.id
  //   )[0];
  // };
  useEffect(() => {
    const dataObj = participants.filter(
      (participant: any) => userId == participant.id
    )[0];
    setParticipantData(dataObj);
  }, [participants]);
  console.log(' >> ', participants, participantData);
  return <></>;
};

export default User;
