'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541311707579_9041';
  exports.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  // add your config here
  config.middleware = [];

  return config;
};
