'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
  async index() {
    const result = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
    ]);
    console.log('resultresultresult', result);
    await this.ctx.render('admin/access/index', {
      list: result,
    });
  }
  async add() {
    // 获取模块列表
    const result = await this.ctx.model.Access.find({ module_id: '0' });
    await this.ctx.render('admin/access/add', {
      moduleList: result,
    });
  }
  async doAdd() {
    const addResult = this.ctx.request.body;
    const { module_id } = addResult;
    if (module_id && module_id !== '0') {
      addResult.module_id = this.app.mongoose.Types.ObjectId(module_id);
    }
    const access = new this.ctx.model.Access(addResult);
    access.save();
    await this.success('/admin/access', '增加权限成功!');
  }
  async edit() {
    await this.ctx.render('admin/access/edit');
  }
}

module.exports = AccessController;
