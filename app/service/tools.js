'use strict';
const svgCaptcha = require('svg-captcha');
const Service = require('egg').Service;
const md5 = require('md5');

class ToolsService extends Service {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 6,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#ddd',
    });
    this.ctx.session.code = captcha.text;
    return captcha;
  }
  async md5(str) {
    return md5(str);
  }
  async getTime() {
    const date = new Date();
    return date.getTime();
  }
}

module.exports = ToolsService;
