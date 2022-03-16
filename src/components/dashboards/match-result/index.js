/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Section from 'components/common/Section';
import { Row } from 'react-bootstrap';
import Participant from './Participant';
import { useTranslation } from 'react-i18next';
import { useGetMatchByIdQuery, useGetMatchResultQuery } from 'api/match';
import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from 'api/user';
import moment from 'moment';
import MatchVideo from './Match-video';
import VideoData from './Mock-Videos.json';

const MatchResult = ({ match }) => {
  console.log(match);
  const { t } = useTranslation();
  const { matchid: matchId, academyId } = useParams();
  const {
    data: matchData,
    error,
    isLoading
  } = useGetMatchByIdQuery({ matchId, academyId });
  const { data } = useGetMatchResultQuery({ matchId, academyId });
  const { data: participants } = useGetUsersQuery(academyId);

  const getParticipantData = id => {
    return participants.filter(participantData => id === participantData.id)[0];
  };
  let duration = 0;
  let videos = null;
  if (data && data[0]) {
    if (JSON.parse(data[0].result).matchDuration) {
      duration = JSON.parse(data[0].result).matchDuration;
    } else if (matchData && matchData[0]) {
      duration = matchData[0].duration;
      data[0].videos && (videos = data[0].videos);
    }
  }

  return (
    <>
      <div className="match-result">
        <div className="match-header mb-3">
          <h5 className="mb-1">{t('matchResults.pageTitle')}</h5>
          {matchData && (
            <ul className="sub-items">
              {duration && duration.toString() && (
                <li>
                  <span className="badge rounded-pill badge-soft-primary">
                    {t('matchResults.duration')}:{' '}
                    {moment.utc(duration * 1000).format('mm:ss')}
                  </span>
                </li>
              )}
              {matchData[0].matchType && (
                <li>
                  <span className="badge rounded-pill badge-soft-primary">
                    {t('matchResults.matchType')}: {matchData[0].matchType}
                  </span>
                </li>
              )}
              {matchData[0].matchGender && (
                <li>
                  <span className="badge rounded-pill badge-soft-primary">
                    {t('matchResults.matchGender')}: {matchData[0].matchGender}
                  </span>
                </li>
              )}
              {matchData[0].giNogi && (
                <li>
                  <span className="badge rounded-pill badge-soft-primary">
                    {t('matchResults.giNogi')}:{' '}
                    {matchData[0].giNogi === 1 ? 'Gi' : 'NoGi'}
                  </span>
                </li>
              )}
              {matchData[0].seniority && (
                <li>
                  <span className="badge rounded-pill badge-soft-primary">
                    {t('matchResults.seniority')}: {matchData[0].seniority}
                  </span>
                </li>
              )}
              {matchData[0].weight && (
                <li>
                  <span className="badge rounded-pill badge-soft-primary">
                    {t('matchResults.weight')}: {matchData[0].weight}
                  </span>
                </li>
              )}
              {matchData[0].matchEndtime && (
                <li>
                  <span className="badge rounded-pill badge-soft-primary">
                    {t('matchResults.endTime')}:{' '}
                    {moment(matchData[0].matchEndtime).format('MM-DD-YYYY')}
                  </span>
                </li>
              )}
            </ul>
          )}
        </div>
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
      </div>
      {(videos || VideoData.length > 0) && (
        <MatchVideo
          className="gallery"
          videos={videos || VideoData[0].videos}
        />
      )}
    </>
  );
};

export default MatchResult;
