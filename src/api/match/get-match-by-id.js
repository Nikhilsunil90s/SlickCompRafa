import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const getMatchById = async (matchId, academyId) => {
  try {
    const response = await axios.get(
      `${apiRoot}/match/${matchId}/${academyId}`
    );
    return response.data[0];
  } catch (e) {
    console.error(e);
  }
};
export default getMatchById;
