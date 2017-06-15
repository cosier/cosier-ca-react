

function prefixer(name, ...args) {
  const prefix = `%c${name} %c${args[0]}`
  args.shift()
  return [prefix, ...args]
}

/**
 * Super Logger
 */
class Logger {

  static debug(args) {
    if (__DEBUG__) {
      args.push(`
        color: white;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
        background: blue;
        display: block;
        border-radius: 10px;
        text-align: center;
        padding-left: 7px;
      `);

      args.push(`
        color: #000;
        font-size: 11px;
        margin-bottom: 10px;
        background:white;
        margin-left:10px;
        padding-left: 10px;
        display: block;
      `);
      console.debug.call(console, ...args)
    }
  }

  static log(args) {
    args.push("font-size: medium")

    args.push(`
        color: grey;
        font-size: 11px;
        margin-bottom: 10px;
        background:white;
        margin-left:10px;
        padding-left: 10px;
        display: block;
      `);
    console.log.call(console, ...args)
  }

  static warn(args) {
    args.push("font-size: medium")

    args.push(`
        color: grey;
        font-size: 11px;
        margin-bottom: 10px;
        background:white;
        margin-left:10px;
        padding-left: 10px;
        display: block;
      `);
    console.warn.call(console, ...args)
  }

  static error(args) {
    args.push(`
        color: white;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
        background: red;
        display: block;
        border-radius: 10px;
        text-align: center;
        padding-left: 7px;
      `);

    args.push(`
        color: grey;
        font-size: 11px;
        margin-bottom: 10px;
        margin-left:10px;
        padding-left: 10px;
        display: block;
      `);
    console.error.call(console, ...args)
  }

  static create(name) {
    const logger = (...args) => {
      if (__DEBUG__)
        Logger.debug(prefixer(name, ...args));
    };

    logger.debug = (...args) => {
      if (__DEBUG__)
        Logger.debug(prefixer(name, ...args));
    };

    logger.info = (...args) => {
      Logger.info(prefixer(name, ...args));
    };


    logger.warn = (...args) => {
      Logger.warn(prefixer(name, ...args));
    };

    logger.error = (...args) => {
      Logger.error(prefixer(name, ...args));
    };

    return logger;
  }
}

export default Logger;
export {Logger};
