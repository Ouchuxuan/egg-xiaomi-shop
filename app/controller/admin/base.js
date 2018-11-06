'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl) {
    await this.ctx.render('admin/public/success', { redirectUrl });
  }
  async error(redirectUrl) {
    await this.ctx.render('admin/public/error', { redirectUrl });
  }
}

module.exports = BaseController;
