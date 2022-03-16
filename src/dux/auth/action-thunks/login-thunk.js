import login from 'api/auth/login';
import ACTION_TYPE from '../ACTION_TYPE';

export const loginWithCredentials =
  (username, password, isAcademy) => async dispatch => {
    dispatch({
      type: ACTION_TYPE.LOG_ON
    });
    window.localStorage.setItem('username', username);
    try {
      const result = await login(username, password, isAcademy);
      window.localStorage.setItem(
        'token',
        result.body.AuthenticationResult.IdToken
      );
      window.localStorage.setItem(
        'refreshToken',
        result.body.AuthenticationResult.AccessToken
      );
      dispatch({
        type: ACTION_TYPE.LOGGED_IN,
        token: result.body.AuthenticationResult.IdToken,
        academyId: result.body.academyId,
        isAcademy
      });
      window.location.href = '/dashboard/profile/';
    } catch (e) {
      dispatch({
        type: ACTION_TYPE.LOGIN_FAILED,
        error: e
      });
    }
  };
