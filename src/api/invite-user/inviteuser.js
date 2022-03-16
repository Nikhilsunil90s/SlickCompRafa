import axios from 'axios';
const apiRoot = process.env.REACT_APP_API_ROOT;

const userInvitation = async inviteData => {
  const response = await axios.post(`${apiRoot}/user-invite`, inviteData);
  return response;
};

export default userInvitation;
