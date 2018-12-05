'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541311707579_9041';
  config.uploadDir = 'app/public/admin/upload';
  exports.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  config.session = {
    key: 'SESSION_ID',
    maxAge: 864000,
    httpOnly: true,
    encrypt: true,
    renew: true,
  };
  // add your config here
  config.middleware = [ 'adminAuth' ];
  config.adminAuth = {
    match: '/admin',
  };
  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/xiaomishop',
      options: {},
    },
  };
  return config;
};
