/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import getMatchResult from 'api/match/get-match-result';
import { getParticipants } from 'api/participants';
import Section from 'components/common/Section';
import { Row } from 'react-bootstrap';
import Participant from './Participant';

const MatchResult = ({ match }) => {
  const [data, setData] = useState(null);
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getMatchResult(
        match.params.matchid,
        match.params.academyId
      );
      setData(response);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getParticipants(match.params.academyId);
      setParticipants(response);
    })();
  }, data);

  const getParticipantData = id => {
    return participants.filter(participantData => id === participantData.id)[0];
  };
  return (
    <>
      {data && participants && (
        <Section className="score-card light d-flex add">
          <div className="holder d-flex flex-column flex-1">
            {data && (
              <>
                <Row
                  className="justify-content-between flex-1 m-0"
                  style={{ backgroundColor: '#402433' }}
                >
                  <Participant
                    participantData={getParticipantData(data[0].matchWinner)}
                    winner={true}
                    cardColor="#d04e8c"
                    result={JSON.parse(data[0].result).winner}
                    method={JSON.parse(data[0].result).method}
                  />
                </Row>
                <Row
                  className="justify-content-between flex-1 m-0"
                  style={{ backgroundColor: '#2a2764' }}
                >
                  <Participant
                    participantData={getParticipantData(data[0].matchLoser)}
                    winner={false}
                    cardColor="#2a59ce"
                    result={JSON.parse(data[0].result).loser}
                    method={JSON.parse(data[0].result).method}
                  />
                </Row>
              </>
            )}
          </div>
        </Section>
      )}
    </>
  );
};

export default MatchResult;
