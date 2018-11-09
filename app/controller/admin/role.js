'use strict';

const BaseController = require('./base');
class RoleController extends BaseController {
  async index() {
    const result = await this.ctx.model.Role.find({});
    await this.ctx.render('admin/role/index', {
      list: result,
    });
  }
  async add() {
    await this.ctx.render('admin/role/add');
  }
  async doAdd() {
    const { title, description } = this.ctx.request.body;
    const role = new this.ctx.model.Role({
      title,
      description,
    });
    await role.save();
    await this.success('/admin/role', '增加角色成功!');
  }
  async edit() {
    const { id } = this.ctx.query;
    const roleResult = await this.ctx.model.Role.find({ _id: id });
    await this.ctx.render('admin/role/edit', {
      list: roleResult[0],
    });
  }
  async doEdit() {
    const { _id, title, description } = this.ctx.request.body;
    await this.ctx.model.Role.updateOne({
      _id,
    }, {
      title,
      description,
    });
    await this.success('/admin/role', '编辑角色成功！');
  }
  async delete() {
    this.ctx.body = '删除角色';
  }
}

module.exports = RoleController;
