import getAcademy from 'api/academy/get-academy';
import getProfile from 'api/user/get-profile';
import login from 'api/auth/login';
import ACTION_TYPE from '../ACTION_TYPE';

export const loginWithCredentials =
  (username, password, rememberMe, isAcademy) => async dispatch => {
    dispatch({
      type: ACTION_TYPE.LOG_ON
    });
    window.localStorage.setItem('username', '');
    window.localStorage.setItem('password', '');
    window.localStorage.setItem('rememberMe', 'false');
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
      let avatar = '';
      if (isAcademy) {
        const academy = await getAcademy(result.body.academyId);
        avatar = academy[0]?.avatarUrl;
      } else {
        const user = await getProfile(result.body.uuid);
        avatar = user[0]?.avatarUrl;
      }
      window.localStorage.setItem('username', username);
      dispatch({
        type: ACTION_TYPE.LOGGED_IN,
        token: result.body.AuthenticationResult.IdToken,
        academyId: result.body.academyId,
        uuid: result.body.uuid,
        userId: result.body.userId,
        avatar,
        isAcademy
      });
      if (rememberMe) {
        window.localStorage.setItem('rememberMe', 'true');
        window.localStorage.setItem('password', password);
      }
      window.location.href = '/dashboard/profile/';
    } catch (e) {
      dispatch({
        type: ACTION_TYPE.LOGIN_FAILED,
        error: e
      });
    }
  };
