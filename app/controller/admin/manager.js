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
    console.log(this.ctx.request.body);
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
    await this.ctx.render('admin/manager/edit');
  }
}

module.exports = ManagerController;
