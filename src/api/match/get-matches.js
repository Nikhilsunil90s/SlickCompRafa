import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const getMatches = async academyId => {
  try {
    const response = await axios.get(`${apiRoot}/matches/${academyId}`);
    return response.data.map(match => ({ ...match, academyId }));
  } catch (e) {
    console.error(e);
  }
};
export default getMatches;
