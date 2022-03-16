import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const getProfile = async uuid => {
  try {
    const response = await axios.get(`${apiRoot}/user/${uuid}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
export default getProfile;
