'use strict';

const BaseController = require('./base.js');

class LoginController extends BaseController {
  async index() {
    await this.ctx.render('admin/login');
  }
  async doLogin() {
    console.log(this.ctx.request.body);
    // await this.success('/admin/login');
  }
}

module.exports = LoginController;
