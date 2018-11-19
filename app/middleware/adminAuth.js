'use strict';
const url = require('url');
module.exports = options => {
  return async function adminAuth(ctx, next) {
    ctx.state.csrf = ctx.csrf;
    ctx.state.prevPage = ctx.request.headers.referer;
    const pathName = url.parse(ctx.request.url).pathname;
    if (ctx.session.userinfo) {
      ctx.state.userinfo = ctx.session.userinfo;
      const hasAuth = await ctx.service.admin.checkAuth();
      if (hasAuth) {
        ctx.state.asideList = await ctx.service.admin.getAuthList(ctx.session.userinfo.role_id);
        await next();
      } else {
        ctx.body = '您没有权限访问当前地址';
      }
    } else {
      if (pathName === '/admin/login' || pathName === '/admin/doLogin' || pathName === '/admin/verify') {
        await next();
      } else {
        ctx.render('/admin/login');
      }
    }
  };
};
