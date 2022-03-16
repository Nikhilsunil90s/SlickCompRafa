import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const createUser = async data => {
  try {
    const response = await axios.post(`${apiRoot}/user`, data);
    if (response.data.statusCode !== 200) {
      throw Error(JSON.parse(response.data.body) || response.data);
    }
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
export default createUser;
