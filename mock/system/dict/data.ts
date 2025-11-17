// mock/system/dict/data.ts - 修复版本
import { MockMethod } from 'vite-plugin-mock';

const dictData: Record<string, any[]> = {
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
    { dictLabel: '授权', dictValue: '3', listClass: 'success', cssClass: '' }
  ],
  sys_common_status: [
    { dictLabel: '成功', dictValue: '0', listClass: 'primary', cssClass: '' },
    { dictLabel: '失败', dictValue: '1', listClass: 'danger', cssClass: '' },
  ]
};

export default [
  {
    url: '/dev-api/system/dict/data/type/:dictType',
    method: 'get',
    response: (req: any) => {
      // vite-plugin-mock v3.x 中正确的参数获取方式
      const dictType = req.url.split('/').pop()?.split('?')[0];
      const data = dictData[dictType] || [];
      return {
        code: 200,
        msg: '操作成功',
        data,
      };
    },
  },
] as MockMethod[];