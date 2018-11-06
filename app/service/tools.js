'use strict';
const svgCaptcha = require('svg-captcha');
const Service = require('egg').Service;

class ToolsService extends Service {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 6,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    });
    this.ctx.session.code = captcha.text;
    return captcha;
  }
}

module.exports = ToolsService;
