export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
// import {LOCATION_CHANGE} from 'consts';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

const initialState = {
    // location: history.location,
    // action: history.action,
    first_load: true,
};

let $body = null;

export function routerReducer(state = initialState, { type, payload } = {}) {
    let new_state = state
    if (type === LOCATION_CHANGE) {
        // console.log("routerReducer", payload);

        if (!$body && document && document.body) {
            $body = window.jQuery(document.body);
        }

        if ($body && payload) {
            const p = (payload.location && payload.location.pathname);
            let path = payload.location.pathname;

            if (path) {
                path = path.substr(1);
            }

            $body.attr('last-route', $body.attr('route') || 'intro');
            $body.attr('route', path || 'intro');
        }

        new_state = { first_load: false };
        // new_state.first_load = false;
    }

    return new_state
}
