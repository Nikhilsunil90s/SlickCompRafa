import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const getAcademy = async (academyId: string) => {
  try {
    const response = await axios.get(`${apiRoot}/academy/${academyId}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
export default getAcademy;
