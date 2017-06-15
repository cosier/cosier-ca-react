// export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
/* import {LOCATION_CHANGE} from 'consts';
 * import createBrowserHistory from 'history/createBrowserHistory';
 * const history = createBrowserHistory();
 *
 * const initialState = {
 *   location: history.location,
 *   action: history.action,
 * }
 *
 * let $body = null;
 *
 * export function routerReducer(state = initialState, { type, payload } = {}) {
 *   console.log("routerReducer", state, type, payload)
 *   if (type === LOCATION_CHANGE) {
 *     if (!$body && document && document.body) {
 *       $body = window.jQuery(document.body)
 *     }
 *
 *     if ($body && payload) {
 *       const p = (payload.location && payload.location.pathname)
 *       let path = payload.location.pathname;
 *
 *       if (path){
 *         path = path.substr(1)
 *       }
 *
 *       $body.attr('last-route', $body.attr('route'))
 *       $body.attr('route', path)
 *     }
 *
 *     return { ...state, ...payload }
 *   }
 *
 *   return state
 * }*/
