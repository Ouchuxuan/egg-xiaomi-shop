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
      {
        $match: {
          module_id: '0',
        },
      },
    ]);
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
    try {
      const addResult = this.ctx.request.body;
      const { module_id } = addResult;
      if (module_id && module_id !== '0') {
        addResult.module_id = this.app.mongoose.Types.ObjectId(module_id);
      }
      const access = new this.ctx.model.Access(addResult);
      access.save();
      await this.success('/admin/access', '增加权限成功!');
    } catch (error) {
      console.log(error);
    }
  }
  async edit() {
    const id = this.ctx.request.query.id;
    // 获取编辑的数据
    const accessResult = await this.ctx.model.Access.find({ _id: id });
    // 获取模块数据
    const result = await this.ctx.model.Access.find({ module_id: '0' });
    await this.ctx.render('admin/access/edit', {
      list: accessResult[0],
      moduleList: result,
    });
  }
  async doEdit() {
    const updateResult = this.ctx.request.body;
    const { id, module_id } = updateResult;
    if (module_id !== 0 && module_id !== '0') {
      updateResult.module_id = this.app.mongoose.Types.ObjectId(module_id);
    }
    const result = await this.ctx.model.Access.updateOne({ _id: id }, updateResult);
    await this.success('/admin/access', '修改权限成功！');
  }
}

module.exports = AccessController;
