'use strict';
const pump = require('mz-modules/pump');
const path = require('path');
const fs = require('fs');
const BaseController = require('./base');
class FocusController extends BaseController {
  async index() {
    const result = await this.ctx.model.Focus.find({});
    await this.ctx.render('/admin/focus/index', {
      list: result,
    });
  }
  async add() {
    await this.ctx.render('/admin/focus/add');
  }
  async doAdd() {
    const { ctx } = this;
    let parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) !== null) {
      stream = await parts();
      if (!stream.filename) {
        break;
      }
      // 表单的名字
      let { filename } = stream;
      // 上传图片的目录
      const dir = await this.service.tools.getUploadFile(filename);
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
      files = Object.assign(files, {
        [filename]: dir.saveDir,
      });
    }
    const focusResult = new this.model.Focus(Object.assign(files, parts.field));
    await focusResult.save();
    await this.success('/admin/focus', '增加轮播图成功!');
  }
}

module.exports = FocusController;
