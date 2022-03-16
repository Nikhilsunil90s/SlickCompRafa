import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const createUser = async data => {
  try {
    const response = await axios.post(`${apiRoot}/user`, data);
    if (
      response.status !== 200 ||
      response.data.errorMessage ||
      response.statusCode !== 200
    ) {
      throw Error(response.data.errorMessage || response.data);
    }
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
export default createUser;
