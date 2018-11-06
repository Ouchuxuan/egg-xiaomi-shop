'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
  async index() {
    await this.ctx.render('admin/login');
  }
}

module.exports = LoginController;
