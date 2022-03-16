/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import Section from 'components/common/Section';
import { getMatchById, putMatch } from 'api/match';
import MatchAdmin from 'api/admin/match/MatchAdmin';
import Participant from './Participant';
import Footer from './Footer';
import { Row } from 'react-bootstrap';

const ScoreCard = ({ match }) => {
  const [participant1Score, setP1score] = useState({
    advantage: 0,
    penalties: 0,
    points: 0
  });
  const [participant2Score, setP2score] = useState({
    advantage: 0,
    penalties: 0,
    points: 0
  });
  const [time, setTime] = useState(5 * 60);
  const timeRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [interval, setIntervalId] = useState(null);
  const intervalRef = useRef();
  const [data, setData] = useState(null);
  const [matchAdmin] = useState(new MatchAdmin(match.params.matchid));
  const handlePointUpdate = (points, participant) => {
    if (participant === 1) {
      setP1score(score => {
        return {
          ...score,
          points: score.points + points
        };
      });
    }
    if (participant === 2) {
      setP2score(score => ({
        ...score,
        points: score.points + points
      }));
    }
  };
  const handleAdvantageUpdate = (advantage, participant) => {
    console.log(' => ', advantage, participant);
    if (participant === 1) {
      setP1score(score => ({
        ...score,
        advantage: score.advantage + advantage
      }));
    }
    if (participant === 2) {
      setP2score(score => ({
        ...score,
        advantage: score.advantage + advantage
      }));
    }
  };
  const handlePenaltyUpdate = (penalty, participant) => {
    if (participant === 1) {
      setP1score(score => ({
        ...score,
        penalties: score.penalties + penalty
      }));
    }
    if (participant === 2) {
      setP2score(score => ({
        ...score,
        penalties: score.penalties + penalty
      }));
    }
  };
  const handleTimerUpdate = timeToAdd => {
    setTime(currentTime => timeToAdd + currentTime);
  };
  const handleConnection = (data, connectionId) => {
    console.log(data, connectionId);
    putMatch(data, match.params.connectionId, connectionId);
  };
  const onStart = () => {
    setIntervalId(
      setInterval(() => {
        console.log(timeRef.current);
        if (timeRef.current === 0) {
          clearInterval(intervalRef.current);
          return;
        }
        setTime(currentTime => (currentTime <= 0 ? 0 : currentTime - 1));
      }, 1000)
    );
  };
  const onWin = (participant, by) => {
    if (participant === 1) {
      setP1score(score => ({
        ...score,
        winner: true,
        by
      }));
      setP2score(score => ({
        ...score,
        winner: false,
        by: null
      }));
    }
    if (participant === 2) {
      setP1score(score => ({
        ...score,
        winner: false,
        by: null
      }));
      setP2score(score => ({
        ...score,
        winner: true,
        by
      }));
    }
  };
  useEffect(() => {
    (async () => {
      const response = await getMatchById(
        match.params.matchid,
        match.params.academyId
      );
      setData(response);
      setTime(response.duration || 300);
      matchAdmin.onConnection(connectionId =>
        handleConnection(response, connectionId)
      );
      matchAdmin.onPointUpdate(handlePointUpdate);
      matchAdmin.onAdvantageUpdate(handleAdvantageUpdate);
      matchAdmin.onPenaltyUpdate(handlePenaltyUpdate);
      matchAdmin.onTimerUpdate(handleTimerUpdate);
      matchAdmin.onStart(onStart);
      matchAdmin.onEnd(() => setTime(0));
      matchAdmin.onWin(onWin);
      matchAdmin.onClose(window.close);
      await matchAdmin.init();
    })();
    return () => clearInterval(intervalRef.current);
  }, []);
  return (
    <>
      <Section className="score-card light d-flex">
        <div className="holder d-flex flex-column flex-1">
          {data && (
            <>
              <Row
                className="justify-content-between flex-1 m-0"
                style={{ backgroundColor: '#402433' }}
              >
                <Participant
                  participantData={data.participant1}
                  cardColor="#d04e8c"
                  scores={participant1Score}
                />
              </Row>
              <Row
                className="justify-content-between flex-1 m-0"
                style={{ backgroundColor: '#2a2764' }}
              >
                <Participant
                  participantData={data.participant2}
                  cardColor="#2a59ce"
                  scores={participant2Score}
                />
              </Row>
              <Row className="justify-content-between align-items-start flex-1 m-0">
                <Footer data={data} time={time} />
              </Row>
            </>
          )}
        </div>
      </Section>
    </>
  );
};

export default ScoreCard;
