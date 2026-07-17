import { MockMethod } from 'vite-plugin-mock';

// 👇 简单语言识别（从请求头 or url）
function getLang(req: any): 'zh' | 'en' {
  const lang =
    req.headers?.['accept-language'] ||
    req.query?.lang ||
    'zh';
  return lang.includes('en') ? 'en' : 'zh';
}

// 👇 字典数据（中英文双份）
const dictMap = {
  zh: {
    sys_normal_disable: [
      { dictLabel: '正常', dictValue: '0', listClass: 'primary', cssClass: '' },
      { dictLabel: '停用', dictValue: '1', listClass: 'danger', cssClass: '' },
    ],
    sys_user_sex: [
      { dictLabel: '男', dictValue: '0', listClass: 'primary', cssClass: '' },
      { dictLabel: '女', dictValue: '1', listClass: 'warning', cssClass: '' },
      { dictLabel: '未知', dictValue: '2', listClass: 'info', cssClass: '' },
    ],
    sys_yes_no: [
      { dictLabel: '是', dictValue: '0', listClass: 'primary', cssClass: '' },
      { dictLabel: '否', dictValue: '1', listClass: 'danger', cssClass: '' },
    ],
    sys_notice_type: [
      { dictLabel: '公告', dictValue: '0', listClass: 'success', cssClass: '' },
      { dictLabel: '通知', dictValue: '1', listClass: 'warning', cssClass: '' },
    ],
    sys_oper_type: [
      { dictLabel: '新增', dictValue: '0', listClass: 'primary', cssClass: '' },
      { dictLabel: '修改', dictValue: '1', listClass: 'warning', cssClass: '' },
      { dictLabel: '删除', dictValue: '2', listClass: 'danger', cssClass: '' },
      { dictLabel: '授权', dictValue: '3', listClass: 'success', cssClass: '' },
    ],
    sys_common_status: [
      { dictLabel: '成功', dictValue: '0', listClass: 'primary', cssClass: '' },
      { dictLabel: '失败', dictValue: '1', listClass: 'danger', cssClass: '' },
    ],
    msg: '操作成功',
  },

  en: {
    sys_normal_disable: [
      { dictLabel: 'Normal', dictValue: '0', listClass: 'primary', cssClass: '' },
      { dictLabel: 'Disabled', dictValue: '1', listClass: 'danger', cssClass: '' },
    ],
    sys_user_sex: [
      { dictLabel: 'Male', dictValue: '0', listClass: 'primary', cssClass: '' },
      { dictLabel: 'Female', dictValue: '1', listClass: 'warning', cssClass: '' },
      { dictLabel: 'Unknown', dictValue: '2', listClass: 'info', cssClass: '' },
    ],
    sys_yes_no: [
      { dictLabel: 'Yes', dictValue: '0', listClass: 'primary', cssClass: '' },
      { dictLabel: 'No', dictValue: '1', listClass: 'danger', cssClass: '' },
    ],
    sys_notice_type: [
      { dictLabel: 'Announcement', dictValue: '0', listClass: 'success', cssClass: '' },
      { dictLabel: 'Notification', dictValue: '1', listClass: 'warning', cssClass: '' },
    ],
    sys_oper_type: [
      { dictLabel: 'Create', dictValue: '0', listClass: 'primary', cssClass: '' },
      { dictLabel: 'Update', dictValue: '1', listClass: 'warning', cssClass: '' },
      { dictLabel: 'Delete', dictValue: '2', listClass: 'danger', cssClass: '' },
      { dictLabel: 'Authorize', dictValue: '3', listClass: 'success', cssClass: '' },
    ],
    sys_common_status: [
      { dictLabel: 'Success', dictValue: '0', listClass: 'primary', cssClass: '' },
      { dictLabel: 'Fail', dictValue: '1', listClass: 'danger', cssClass: '' },
    ],
    msg: 'Operation successful',
  },
};

export default [
  {
    url: '/dev-api/system/dict/data/type/:dictType',
    method: 'get',
    response: (req: any) => {
      const dictType = req.url.split('/').pop()?.split('?')[0];
      const lang = getLang(req);

      const currentDict = dictMap[lang];
      const data = currentDict[dictType] || [];

      return {
        code: 200,
        msg: currentDict.msg,
        data,
      };
    },
  },
] as MockMethod[];