import ACTION_TYPE from './ACTION_TYPE';
import INITIAL_STATE from './INITIAL_STATE';

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOG_ON:
      return { ...state, loggedIn: false, loginFailed: false };
    case ACTION_TYPE.LOGGED_IN: {
      return {
        ...state,
        loggedIn: true,
        token: action.token,
        academyId: action.academyId,
        userId: action.userId,
        uuid: action.uuid,
        isAcademy: action.isAcademy,
        avatar: action.avatar
      };
    }
    case ACTION_TYPE.LOGIN_FAILED:
      console.log('action => ', action);
      return { ...state, loginFailed: true };
    default:
      return state;
  }
};
export default authReducer;
