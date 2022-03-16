import axios from 'axios';
import { omit } from 'lodash';
const apiRoot = process.env.REACT_APP_API_ROOT;
const putMatch = async (matchData, connectionId, connectionId2) => {
  await axios.put(`${apiRoot}/match`, {
    ...omit(matchData, ['academy', 'participant1', 'participant2']),
    academyId: matchData.academy.id,
    participant1_id: matchData.participant1.id,
    participant2_id: matchData.participant2.id,
    connectionId,
    connectionId2
  });
};
export default putMatch;
