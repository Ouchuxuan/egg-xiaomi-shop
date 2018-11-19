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
    const {
      title,
      description,
    } = this.ctx.request.body;
    const role = new this.ctx.model.Role({
      title,
      description,
    });
    await role.save();
    await this.success('/admin/role', '增加角色成功!');
  }
  async edit() {
    const {
      id,
    } = this.ctx.query;
    const roleResult = await this.ctx.model.Role.find({
      _id: id,
    });
    await this.ctx.render('admin/role/edit', {
      list: roleResult[0],
    });
  }
  async doEdit() {
    const {
      _id,
      title,
      description,
    } = this.ctx.request.body;
    await this.ctx.model.Role.updateOne({
      _id,
    }, {
      title,
      description,
    });
    await this.success('/admin/role', '编辑角色成功！');
  }
  async auth() {
    const role_id = this.ctx.request.query.id;
    const result = await this.ctx.model.Access.aggregate([{
      $lookup: {
        from: 'access',
        localField: '_id',
        foreignField: 'module_id',
        as: 'items',
      },
    },
    {
      $match: {
        module_id: '0',
      },
    },
    ]);
    const accessResult = await this.ctx.model.RoleAccess.find({ role_id });
    let roleAccessArray = [];
    accessResult.forEach(value => {
      roleAccessArray.push(value.access_id.toString());
    });
    for (let i = 0; i < result.length; i++) {
      if (roleAccessArray.indexOf(result[i]._id.toString()) !== -1) {
        result[i].checked = true;
      }
      for (let j = 0; j < result[i].items.length; j++) {
        if (roleAccessArray.indexOf(result[i].items[j]._id.toString()) !== -1) {
          result[i].items[j].checked = true;
        }
      }
    }
    await this.ctx.render('/admin/role/auth', {
      list: result,
      role_id,
    });
  }
  async doAuth() {
    const authResult = this.ctx.request.body;
    const { role_id, access_node } = authResult;
    // 删除当前角色下的所有权限
    await this.ctx.model.RoleAccess.deleteMany({ role_id });
    // 把获取到的权限和角色增加到RoleAccess数据库
    access_node.forEach(element => {
      const roleAccessData = new this.ctx.model.RoleAccess({
        access_id: element,
        role_id,
      });
      roleAccessData.save();
    });
    await this.success(`/admin/role/auth?id=${role_id}`, '授权成功！');
  }
}

module.exports = RoleController;
