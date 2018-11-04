'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    await this.ctx.render('admin/manager/index.html', {
      username: '张三',
    });
  }
  async add() {
    this.ctx.body = '管理员增加';
  }
}

module.exports = ManagerController;
