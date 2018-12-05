'use strict';
const svgCaptcha = require('svg-captcha');
const Service = require('egg').Service;
const baseMd5 = require('md5');
const sillyTime = require('silly-datetime');
const mkdirp = require('mz-modules/mkdirp');
const path = require('path');

class ToolsService extends Service {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#ddd',
    });
    this.ctx.session.code = captcha.text;
    return captcha;
  }
  async md5(str) {
    return baseMd5(str);
  }
  async getTime() {
    const date = new Date();
    return date.getTime();
  }
  async getUploadFile(filename) {
    // 获取当前日期
    const day = sillyTime.format(new Date(), 'YYYYMMDD');
    // 创建图片保存路径
    const dir = path.join(this.config.baseDir, day);
    await mkdirp(dir);
    // 毫米数
    const time = await this.getTime();
    // 返回图片保存的路径
    const uploadDir = path.join(dir, time + path.extname(filename));
    return {
      saveDir: uploadDir.slice(3).replace(/\\/g, '/'),
      uploadDir,
    };
  }
}

module.exports = ToolsService;
