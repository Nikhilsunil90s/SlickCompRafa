import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const login = async (username, password, isAcademy) => {
  const response = await axios.post(`${apiRoot}/authenticate`, {
    username,
    password,
    isAcademy
  });
  return response.data;
};
export default login;
