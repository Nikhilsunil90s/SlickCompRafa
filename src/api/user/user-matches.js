import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const getUserMatches = async (academyId, userId) => {
  try {
    const response = await axios.get(
      `${apiRoot}/user-matches/${academyId}/${userId}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
export default getUserMatches;
