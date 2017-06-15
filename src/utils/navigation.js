import { LOCATION_CHANGE } from 'consts';

export const push = (path, action = 'PUSH') => {
  return {
    type: LOCATION_CHANGE,
    payload: {
      location: { pathname: path },
      action
    }
  };
}
