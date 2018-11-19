'use strict';
const url = require('url');

const Service = require('egg').Service;
// 角色访问权限控制
class AdminService extends Service {
  async checkAuth() {
    // 1、获取当前用户的角色 （忽略权限判断的地址  is_super）
    // 2、根据角色获取当前角色的权限列表
    // 3、获取当前访问的url 对应的权限id
    // 4、判断当前访问的url对应的权限id 是否在权限列表中的id中
    // ------------------------------
    // 1、获取当前用户的角色
    const userinfo = this.ctx.session.userinfo;
    const { role_id } = userinfo;

    // 2、获取当前用户访问的地址;
    const pathName = url.parse(this.ctx.request.url).pathname;
    // 地址白名单
    const ignoreUrl = [ '/admin/login', '/admin/doLogin', '/admin/verify', '/admin/loginOut' ];
    if (ignoreUrl.indexOf(pathName) !== -1 || userinfo.is_super === 1) {
      return true;
    }
    // 3、根据角色获取当前角色的权限列表
    const accessResult = await this.ctx.model.RoleAccess.find({ role_id });
    // 当前角色可访问的权限列表
    let accessArray = [];
    accessResult.forEach(element => {
      accessArray.push(element.access_id.toString());
    });
    // 3、获取当前访问的url 对应的权限id
    const accessUrlResult = await this.ctx.model.Access.find({ url: pathName });
    if (accessUrlResult.length > 0) {
      if (accessArray.indexOf(accessUrlResult[0]._id.toString()) !== -1) {
        return true;
      }
    }
    return false;
  }
  async getAuthList(role_id) {
    // 1、获取全部的权限
    // 2、查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中
    // 3、循环遍历所有的权限数据     判断当前权限是否在角色权限的数组中，   如果在角色权限的数组中：选中    如果不在角色权限的数组中不选中
    // 1、获取全部的权限
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
    // 2、查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中
    const accessReulst = await this.ctx.model.RoleAccess.find({ role_id });
    let roleAccessArray = [];
    accessReulst.forEach(value => {
      roleAccessArray.push(value.access_id.toString());
    });
    // 3、循环遍历所有的权限数据     判断当前权限是否在角色权限的数组中
    for (let i = 0; i < result.length; i++) {
      if (roleAccessArray.indexOf(result[i]._id.toString()) !== -1) {
        result[i].check = true;
      }
      for (let j = 0; j < result[i].items.length; j++) {
        if (roleAccessArray.indexOf(result[i].items[j]._id.toString()) !== -1) {
          result[i].items[j].checked = true;
        }
      }
    }
    return result;
  }
}

module.exports = AdminService;
