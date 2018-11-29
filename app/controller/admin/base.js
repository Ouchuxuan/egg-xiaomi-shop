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
  // 改变状态的方法 api接口
  async changeStatus() {
    const { ctx } = this;
    const { model, attr, id } = this.ctx.request.query;
    const result = await ctx.model[model].find({ _id: id });
    if (result.length > 0) {
      let json;
      if (result[0][attr] === 1) {
        json = { [attr]: 0 };
      } else {
        json = { [attr]: 1 };
      }
      // 执行更新操作
      const updateResult = await ctx.model[model].updateOne({
        _id: id,
      }, json);
      if (updateResult) {
        ctx.body = { message: '更新成功', success: true };
      } else {
        ctx.body = { message: '更新失败', success: false };
      }
    } else {
      ctx.body = { message: '更新失败,参数错误', success: false };
    }
  }
}

module.exports = BaseController;
