'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
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
