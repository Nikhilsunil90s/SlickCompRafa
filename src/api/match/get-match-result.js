import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const getMatchById = async (matchId, academyId) => {
  try {
    const response = await axios.get(
      `${apiRoot}/match-result/${matchId}/${academyId}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
export default getMatchById;
