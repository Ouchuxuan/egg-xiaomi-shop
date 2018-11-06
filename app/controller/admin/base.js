'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl) {
    await this.ctx.render('admin/public/success', { redirectUrl });
  }
  async error(redirectUrl) {
    await this.ctx.render('admin/public/error', { redirectUrl });
  }
  async verify() {
    const capCha = await this.service.tools.captcha();
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = capCha.data;
  }
}

module.exports = BaseController;
