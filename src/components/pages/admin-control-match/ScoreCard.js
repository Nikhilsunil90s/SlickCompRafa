/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Section from 'components/common/Section';
import { getMatchById, putMatch, postMatchResult } from 'api/match';
import MatchAdmin from 'api/admin/match/MatchAdmin';
import Participant from './Participant';
import Footer from './Footer';
import { Row } from 'react-bootstrap';
import DonotRefresh from 'components/Alerts/DonotRefresh';
import Prompt from 'components/Alerts/Prompt';
import { useTranslation } from 'react-i18next';

const ScoreCard = ({ match }) => {
  const { t } = useTranslation();

  const [participant1Score, setP1score] = useState({
    participant: 1,
    advantage: 0,
    penalties: 0,
    points: 0,
    winner: false,
    by: null
  });
  const [participant2Score, setP2score] = useState({
    participant: 2,
    advantage: 0,
    penalties: 0,
    points: 0,
    winner: false,
    by: null
  });
  const [savePrompt, setSavePrompt] = useState(false);
  const [time, setTime] = useState(300);
  const timeRef = useRef();
  const [matchTime, setMatchTime] = useState(0);
  const matchTimeRef = useRef();
  matchTimeRef.current = matchTime;
  const [data, setData] = useState(null);
  const [isStarted, setStarted] = useState(false);
  const [isReady, setReady] = useState(false);
  const [isStopped, setStopped] = useState(false);
  const stopped = useRef();
  stopped.current = isStopped;
  const [isEnded, setEnded] = useState(false);
  const [endedAt, setEndedAt] = useState(null);
  const [isWon, setWon] = useState(false);
  const [interval, setIntervalId] = useState(null);
  const intervalRef = useRef();
  intervalRef.current = interval;
  const [connectionId, setConnectionId] = useState(null);
  const [matchAdmin] = useState(new MatchAdmin(match?.params?.matchid));
  const loadData = async () => {
    const response = await getMatchById(
      match?.params?.matchid,
      match?.params?.academyId
    );
    console.log(response);
    setP1score(score => ({
      ...score,
      participant: response.participant1.id
    }));
    setP2score(score => ({
      ...score,
      participant: response.participant2.id
    }));
    setTime(response.duration || 300);
    setMatchTime(0);
    setData(response);
    return response;
  };

  const handleConnection = async (data, connectionId) => {
    console.log(data, connectionId);
    setConnectionId(connectionId);
    await putMatch(data, connectionId, '');
    window.open(
      `/match/${match?.params?.academyId}/${match?.params?.matchid}/connectionId/${connectionId}`,
      '_blank'
    );
  };
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
    setTime(currentTime =>
      timeToAdd + currentTime < 0 ? 0 : timeToAdd + currentTime
    );
  };
  const onReady = () => {
    setReady(true);
  };
  const onStart = () => {
    setStarted(true);
    setIntervalId(
      setInterval(() => {
        console.log(timeRef.current);
        if (stopped.current) {
          return;
        }
        if (timeRef.current === 0) {
          onEnd();
          return;
        }
        setMatchTime(matchTime => matchTime + 1);
        setTime(currentTime => (currentTime < 0 ? 0 : currentTime - 1));
      }, 1000)
    );
  };
  const onStop = time => {
    setTime(time);
    setStopped(true);
  };
  const onResume = time => {
    setTime(time);
    setStopped(false);
  };

  const onEnd = () => {
    setEnded(true);
    setEndedAt(moment().format('YYYY-MM-DD HH:mm:ss'));
    setTime(0);
    console.log(intervalRef.current);
    clearInterval(intervalRef.current);
  };
  const onBack = () => {
    setEnded(false);
    setStarted(true);
  };
  const onFinalBack = () => {
    setWon(false);
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
    setWon(true);
  };
  const onSave = () => {
    setSavePrompt(true);
  };
  const onSaveNo = () => {
    setSavePrompt(false);
  };
  const onSaveYes = async () => {
    setSavePrompt(false);
    await putMatch(
      {
        ...data,
        matchEndtime: endedAt
      },
      connectionId,
      null
    );
    const winner = participant1Score.winner
      ? participant1Score
      : participant2Score;
    const loser = participant1Score.winner
      ? participant2Score
      : participant1Score;
    await postMatchResult({
      matchId: data.matchId,
      matchWinner: winner.participant,
      matchLoser: loser.participant,
      result: {
        method: winner.by,
        winner: {
          points: winner.points,
          advantage: winner.advantage,
          penaty: winner.penalties
        },
        loser: {
          points: loser.points,
          advantage: loser.advantage,
          penaty: loser.penalties
        },
        matchDuration: matchTimeRef.current
      }
    });
    matchAdmin.close();
  };

  useEffect(() => {
    (async () => {
      const matchData = await loadData();
      matchAdmin.onConnection(connectionId =>
        handleConnection(matchData, connectionId)
      );
      matchAdmin.onPointUpdate(handlePointUpdate);
      matchAdmin.onAdvantageUpdate(handleAdvantageUpdate);
      matchAdmin.onPenaltyUpdate(handlePenaltyUpdate);
      matchAdmin.onTimerUpdate(handleTimerUpdate);
      matchAdmin.onReady(onReady);
      matchAdmin.onStart(onStart);
      matchAdmin.onEnd(onEnd);
      matchAdmin.onWin(onWin);
      matchAdmin.onStop(onStop);
      matchAdmin.onResume(onResume);
      matchAdmin.onClose(() => (window.location.href = '/dashboard/matches'));
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
              {savePrompt && (
                <Prompt
                  prompt={t('adminControlMatch.scoreCard.promptText')}
                  onYes={onSaveYes}
                  onNo={onSaveNo}
                />
              )}
              <DonotRefresh />
              <Row
                className="justify-content-between flex-1 m-0"
                style={{ backgroundColor: '#402433' }}
              >
                <Participant
                  addPoints={points => matchAdmin.addPoints(1, points)}
                  subtractPoints={points =>
                    matchAdmin.subtractPoints(1, points)
                  }
                  participantData={data.participant1}
                  cardColor="#d04e8c"
                  advantage={() => matchAdmin.advantage(1)}
                  disadvantage={() => matchAdmin.disadvantage(1)}
                  penalize={() => matchAdmin.penalize(1)}
                  depenalize={() => matchAdmin.depenalize(1)}
                  declareWinner={by => matchAdmin.declareWinner(1, by)}
                  scores={participant1Score}
                  isStarted={isStarted}
                  isEnded={isEnded}
                  isWon={isWon}
                />
              </Row>
              <Row
                className="justify-content-between flex-1 m-0"
                style={{ backgroundColor: '#2a2764' }}
              >
                <Participant
                  addPoints={points => matchAdmin.addPoints(2, points)}
                  subtractPoints={points =>
                    matchAdmin.subtractPoints(2, points)
                  }
                  participantData={data.participant2}
                  advantage={() => matchAdmin.advantage(2)}
                  disadvantage={() => matchAdmin.disadvantage(2)}
                  penalize={() => matchAdmin.penalize(2)}
                  depenalize={() => matchAdmin.depenalize(2)}
                  declareWinner={by => matchAdmin.declareWinner(2, by)}
                  cardColor="#2a59ce"
                  scores={participant2Score}
                  isStarted={isStarted}
                  isEnded={isEnded}
                  isWon={isWon}
                />
              </Row>
              <Row className="justify-content-between align-items-start flex-1 m-0">
                <Footer
                  data={data}
                  time={time}
                  isStarted={isStarted}
                  onStart={matchAdmin.startMatch}
                  onEnd={matchAdmin.endMatch}
                  onBack={onBack}
                  onFinalBack={onFinalBack}
                  isEnded={isEnded}
                  isWon={isWon}
                  isReady={isReady}
                  isStopped={isStopped}
                  onResume={() => matchAdmin.resumeMatch(time)}
                  onStop={() => matchAdmin.stopMatch(time)}
                  onSave={onSave}
                  proceedTimer={matchAdmin.addToTimer}
                  penalizeTimer={matchAdmin.subtractFromTimer}
                />
              </Row>
            </>
          )}
        </div>
      </Section>
    </>
  );
};

export default ScoreCard;
