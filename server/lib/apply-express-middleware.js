import _debug from 'debug';
const debug = _debug('express:middleware');
/**
 * applyExpressMiddleware
 * @param {function} fn
 * @param {object} req
 * @param {object} res
 * @return {function} Async promise
 */
export default function applyExpressMiddleware(fn, req, res) {
  const originalEnd = res.end;
  debug('applyExpressMiddleware()')

  return new Promise((resolve, ...args) => {
    res.end = function(content) {
      console.error("res.end", res);

      const original_result = originalEnd.apply(this, content);
      resolve(false);
    };

    fn(req, res, () => {
      resolve(true);
    });
  });
}
