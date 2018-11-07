'use strict';

const BaseController = require('./base.js');

class LoginController extends BaseController {
  async index() {
    await this.ctx.render('admin/login');
  }
  async doLogin() {
    const { username, code } = this.ctx.request.body;
    const password = await this.service.tools.md5(this.ctx.request.body.password);
    if (code.toUpperCase() === this.ctx.session.code.toUpperCase()) {
      const result = await this.ctx.model.Admin.find({
        'username': username,
        'password': password,
      });
      if (result.length > 0) {
        this.ctx.session.userinfo = result[0];
        this.ctx.redirect('/admin/manager');
      } else {
        await this.error('/admin/login', '用户名或密码不对!');
      }
    } else {
      await this.error('admin/login', '验证码错误');
    }
  }
  async loginOut() {
    this.ctx.session.userinfo = null;
    this.ctx.redirect('/admin/login');
  }
}

module.exports = LoginController;
