/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios from 'axios';

const apiRoot = process.env.REACT_APP_API_ROOT || '';
const forgetPassword = async (email: string, isAcademy: boolean) => {
  try {
    const response = await axios.post(`${apiRoot}/forgot-password`, {
      email,
      isAcademy
    });
    if (response.data.statusCode !== 200) {
      throw Error(JSON.parse(response.data.body) || response.data);
    }
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
export default forgetPassword;
