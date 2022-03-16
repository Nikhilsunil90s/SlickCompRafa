import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const getParticipants = async academyId => {
  try {
    const response = await axios.get(`${apiRoot}/users/${academyId}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
export default getParticipants;
