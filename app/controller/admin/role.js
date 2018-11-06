'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    await this.ctx.render('admin/role/index');
  }
  async add() {
    await this.ctx.render('admin/role/add');
  }
  async edit() {
    await this.ctx.render('admin/role/edit');
  }
  async delete() {
    this.ctx.body = '删除角色';
  }
}

module.exports = RoleController;
