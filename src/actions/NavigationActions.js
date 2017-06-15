
import * as C from 'consts';
import {push} from 'utils';

export function navigate(path) {
  if (__DEV__) console.log(`Navigation --------> ${path}`)
  return push(path);
}
