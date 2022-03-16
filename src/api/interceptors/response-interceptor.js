import axios from 'axios';
import { toast } from 'react-toastify';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
const apiRoot = process.env.REACT_APP_API_ROOT;
const refreshAuthLogic = async failedRequest => {
  try {
    if (
      window.localStorage.getItem('username') &&
      window.localStorage.getItem('refreshToken')
    ) {
      const response = await axios.create().post(
        `${apiRoot}/refresh`,
        {
          username: window.localStorage.getItem('username'),
          refreshToken: window.localStorage.getItem('refreshToken')
        },
        {
          headers: {
            date: window.localStorage.getItem('date')
          },
          withCredentials: true
        }
      );
      window.localStorage.setItem(
        'token',
        response.body.AuthenticationResult.IdToken
      );
      failedRequest.response.config.headers['Authorization'] =
        response.body.AuthenticationResult.IdToken;
    }
    throw Error('No refresh token');
  } catch (e) {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('persist:root');
    window.localStorage.removeItem('refreshToken');
    toast.error('Please login again', {
      autoClose: 1500,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      onClose: () => (window.location.href = '/')
    });
  }
};
createAuthRefreshInterceptor(axios, refreshAuthLogic);
