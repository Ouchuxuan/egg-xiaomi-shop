'use strict';
const url = require('url');
module.exports = options => {
  return async function adminAuth(ctx, next) {
    ctx.state.csrf = ctx.csrf;
    const pathName = url.parse(ctx.request.url).pathname;
    if (ctx.session.userinfo) {
      ctx.state.userinfo = ctx.session.userinfo;
      await next();
    } else {
      if (pathName === '/admin/login' || pathName === '/admin/doLogin' || pathName === '/admin/verify') {
        await next();
      } else {
        ctx.render('/admin/login');
      }
    }
  };
};
