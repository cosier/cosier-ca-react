import {VERIFY_EMAIL} from 'consts';

const initialState = {};

/**
 * Verificator
 *
 * @param {object} state
 * @param {object} action
 * @return {object} Action pojo
 */
export default function Verificator(state = initialState, action) {
  if (!action) {
    return;
  }
  switch (action.type) {
    case VERIFY_EMAIL:
      return {
        processing: true,
        lastAction: action,
        ...state,
      };

    default:
      return state;
  }
}

