'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    await this.ctx.render('admin/manager/index');
  }
  async add() {
    await this.ctx.render('admin/manager/add');
  }
  async edit() {
    await this.ctx.render('admin/manager/edit');
  }
}

module.exports = ManagerController;
