import WebpackDevMiddleware from 'webpack-dev-middleware';
import applyExpressMiddleware from 'server/lib/apply-express-middleware';

import _debug from 'debug';
import config from 'config';

const paths = config.utils_paths;
const debug = _debug('app:server:webpack-dev');

export default function(compiler, publicPath) {
  debug('Enable webpack dev middleware.');

  const middleware = WebpackDevMiddleware(compiler, {
    hot: true,
    lazy: false,
    publicPath,
    contentBase: paths.client(),
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    stats: config.compiler_stats,
  });

  return async function koaWebpackDevMiddleware(ctx, next) {
    const response = {
      end: (content) => {
        (ctx.body = content)
      },
      setHeader() {
        ctx.set(...arguments);
      },
    };

    const hasNext = await applyExpressMiddleware(middleware, ctx.req, response);
    console.error("hasNext:", hasNext)

    if (hasNext) {
      await next();
    }
    // await next();
  };
}
