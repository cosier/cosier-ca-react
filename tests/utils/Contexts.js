
import getMuiTheme from 'styles';
import {mount, render, shallow} from 'enzyme';

/**
 * Create Context
 * @param {string} t Type of Context desired
 * @param {object} opts Optional configuration
 * @return {function} Mount Helper
 */
export default function createContext(t = 'shallow', opts) {
  const muiTheme = getMuiTheme();

  if (t == 'shallow') return createShallowContext(muiTheme, opts);
  if (t == 'render') return createRenderContext(muiTheme, opts);
  return createMountContext(muiTheme, opts);
}

/**
 * Create Render Context
 * @param {string} theme Theme Configuration
 * @param {object} opts Optional configuration
 * @return {function} Render Helper with appropiate context
 */
export function createRenderContext(theme = getMuiTheme(), opts) {
  return (node) => render(node, {context: {muiTheme: theme}});
}

/**
 * Create Shallow Context
 * @param {string} theme Theme Configuration
 * @param {object} opts Optional configuration
 * @return {function} Dom Shallow Helper with appropiate context
 */
export function createShallowContext(theme = getMuiTheme(), opts) {
  return (node) => shallow(node, {context: {muiTheme: theme}});
}

/**
 * Create Mount Context
 * @param {string} theme Theme Configuration
 * @param {object} opts Optional configuration
 * @return {function} Dom Mount Helper with appropiate context
 */
export function createMountContext(muiTheme = getMuiTheme(), opts) {
  return (node) => mount(node, {
    context: {
      muiTheme: muiTheme
    },
    ...opts
  });
}
