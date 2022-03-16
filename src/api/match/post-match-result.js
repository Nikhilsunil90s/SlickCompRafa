import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const postMatchResult = async matchResult => {
  await axios.post(`${apiRoot}/match-result`, matchResult);
};
export default postMatchResult;
