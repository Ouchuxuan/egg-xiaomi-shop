'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    const result = await this.ctx.model.Role.find({});
    console.log('result', result);
    await this.ctx.render('admin/role/index', {
      list: result,
    });
  }
  async add() {
    await this.ctx.render('admin/role/add');
  }
  async doAdd() {
    
  }
  async edit() {
    await this.ctx.render('admin/role/edit');
  }
  async delete() {
    this.ctx.body = '删除角色';
  }
}

module.exports = RoleController;
