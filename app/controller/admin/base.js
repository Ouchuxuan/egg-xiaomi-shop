'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl, message = '操作成功!') {
    await this.ctx.render('admin/public/success',
      { redirectUrl, message }
    );
  }
  async error(redirectUrl, message = '操作成功!') {
    await this.ctx.render('admin/public/error',
      { redirectUrl, message }
    );
  }
  async verify() {
    const capCha = await this.service.tools.captcha();
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = capCha.data;
  }
  async delete() {
    const { id, model } = this.ctx.request.query;
    await this.ctx.model[model].deleteOne({ _id: id });
    this.ctx.redirect(this.ctx.state.prevPage);
  }
  async changeStatus() {
    const { model, attr, id } = this.ctx.request.query;
  }
}

module.exports = BaseController;
