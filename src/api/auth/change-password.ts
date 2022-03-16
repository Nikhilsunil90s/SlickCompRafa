/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT || '';
const changePassword = async (
  uuid: string,
  md5: string,
  password: string,
  isAcademy: boolean
) => {
  const response = await axios.post(`${apiRoot}/change-password`, {
    uuid,
    isAcademy,
    md5,
    newPass: password
  });
  return uuid;
};
export default changePassword;
