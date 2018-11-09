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
    console.log('result', JSON.stringify(result));
    await this.ctx.render('admin/manager/index', {
      list: result,
    });
  }
  async add() {
    const roleResult = await this.ctx.model.Role.find();
    await this.ctx.render('admin/manager/add', { roleResult });
  }
  async edit() {
    await this.ctx.render('admin/manager/edit');
  }
}

module.exports = ManagerController;
