'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
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
