'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
  async index() {
  // 查询管理员表并管理角色表
    const result = await this.ctx.model.Admin.aggregate([
      {
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        },
      },
    ]);
    await this.ctx.render('admin/manager/index', {
      list: result,
    });
  }
  async add() {
    const roleResult = await this.ctx.model.Role.find();
    await this.ctx.render('admin/manager/add', { roleResult });
  }
  async doAdd() {
    const addResult = this.ctx.request.body;
    // 密码加密
    if (addResult.password) {
      addResult.password = await this.service.tools.md5(addResult.password);
    }
    const adminResult = await this.ctx.model.Admin.find({
      username: addResult.username,
    });
    if (adminResult.length > 0) {
      await this.error('/admin/manager/add', '此管理员已经存在');
    } else {
      const admin = new this.ctx.model.Admin(addResult);
      admin.save();
      await this.success('/admin/manager', '增加用户成功！');
    }
  }
  async edit() {
    const id = this.ctx.request.query.id;
    // 获取管理员信息
    const adminResult = await this.ctx.model.Admin.find({ _id: id });
    // 获取角色列表
    const roleResult = await this.ctx.model.Role.find();
    await this.ctx.render('admin/manager/edit', {
      adminResult: adminResult[0],
      roleResult,
    });
  }
  async doEdit() {
    let { id, password, mobile, email, role_id } = this.ctx.request.body;
    password = await this.service.tools.md5(password);
    await this.ctx.model.Admin.updateOne({ _id: id }, {
      password,
      mobile,
      email,
      role_id,
    });
    await this.success('/admin/manager', '修改管理员信息成功!');
  }
}

module.exports = ManagerController;
