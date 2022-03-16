import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const postMatch = async matchData => {
  await axios.post(`${apiRoot}/match`, matchData);
};
export default postMatch;
