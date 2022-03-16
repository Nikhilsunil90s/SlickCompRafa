import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;
const updateProfile = async (uuid: string, data: any, isAcademy: boolean) => {
  try {
    const response = await axios.put(
      `${apiRoot}/${isAcademy ? 'academy-update' : 'user'}`,
      { ...data, uuid }
    );
    if (response.data.statusCode !== 200) {
      throw Error(JSON.parse(response.data.body) || response.data);
    }
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
export default updateProfile;
