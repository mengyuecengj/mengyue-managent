// src/mock/modules/dashboard.ts
import { MockMethod } from 'vite-plugin-mock';

// 大屏类型定义
interface Dashboard {
  id: number;
  name: string;
  description: string;
  thumbnail: string;        // 缩略图 base64 或 URL
  config: Record<string, any>; // 完整大屏配置 JSON
  status: string;           // 0 正常 1 已发布 2 草稿
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  remark?: string;
}

// 内存中的大屏数据（会自动持久化到 localStorage）
let mockDashboardList: Dashboard[] = [
  // {
  //   id: 1,
  //   name: '旅游数据监控大屏',
  //   description: '实时展示游客流量、景区热度、收入统计等关键指标',
  //   thumbnail: '',
  //   config: {},
  //   status: '1',
  //   createBy: 'admin',
  //   createTime: '2025-11-10 09:30:00',
  //   updateBy: 'admin',
  //   updateTime: '2025-11-22 14:20:33',
  //   remark: '主屏已发布'
  // },
  // {
  //   id: 2,
  //   name: '警务监控系统副屏',
  //   description: '警力分布、警情统计、摄像头状态监控',
  //   thumbnail: '',
  //   config: {},
  //   status: '0',
  //   createBy: 'admin',
  //   createTime: '2025-11-15 16:45:21',
  //   updateBy: 'ry',
  //   updateTime: '2025-11-20 10:15:08',
  //   remark: '开发中'
  // },
  {
    id: 1,
    name: '智慧城市运行中心',
    description: '城市综合运行态势大屏',
    thumbnail: '',
    config: {},
    status: '1',
    createBy: 'admin',
    createTime: '2025-11-18 11:00:00',
    updateBy: 'admin',
    updateTime: '2025-11-23 09:22:11'
  },
];

// ==================== 持久化相关函数 ===================
const STORAGE_KEY = 'mockDashboardList';

function saveMockDashboards() {
  if (typeof window === 'undefined') return;
  try {
    const data = {
      version: '1.0',
      list: mockDashboardList.map(d => ({
        ...d,
        id: Number(d.id),
        config: d.config || {},
        thumbnail: String(d.thumbnail || ''),
        status: String(d.status),
      }))
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Mock Dashboard: 保存失败', e);
  }
}

// 初始化加载
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.version === '1.0' && Array.isArray(parsed?.list)) {
        mockDashboardList = parsed.list.map((d: any) => ({
          id: Number(d.id),
          name: String(d.name || '未命名大屏'),
          description: String(d.description || ''),
          thumbnail: String(d.thumbnail || ''),
          config: d.config || {},
          status: String(d.status || '0'),
          createBy: String(d.createBy || 'admin'),
          createTime: String(d.createTime || new Date().toISOString().replace('T', ' ').substr(0, 19)),
          updateBy: String(d.updateBy || 'admin'),
          updateTime: String(d.updateTime || new Date().toISOString().replace('T', ' ').substr(0, 19)),
          remark: String(d.remark || ''),
        }));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  saveMockDashboards();
}

// ==================== Mock 接口定义 ====================
export default [
  // 获取大屏列表
  {
    url: '/dev-api/dashboard/design/list',
    method: 'get',
    timeout: 300,
    response: ({ query }: any) => {
      let list = [...mockDashboardList];

      // 支持搜索
      if (query.name) {
        list = list.filter(d => d.name.includes(query.name) || (d.description && d.description.includes(query.name)));
      }
      if (query.status) {
        list = list.filter(d => d.status === query.status);
      }

      // 排序（默认按更新时间倒序）
      list.sort((a, b) => new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime());

      return {
        code: 200,
        msg: '操作成功',
        total: list.length,
        rows: list
      };
    }
  },

  // 新建大屏
  {
    url: '/dev-api/dashboard/design',
    method: 'post',
    timeout: 400,
    response: ({ body }: { body: any }) => {
      // 关键修复：直接取前端传的字段，不要默认值、不要自动生成！
      const name = body.dashboardName || '未命名大屏';        // 只在完全没传时兜底
      const description = body.dashboardDesc || '';
      const remark = body.remark || '';

      // 检查是否为空（可选：你可以允许用户创建空名字的大屏）
      if (!name.trim()) {
        return { code: 500, msg: '大屏名称不能为空' };
      }

      // 重名检查：跳过系统默认的“未命名大屏”
      const exist = mockDashboardList.find(d =>
        d.name === name &&
        d.name !== '未命名大屏'  // 不跟系统默认的脏数据比
      );
      if (exist) {
        return { code: 500, msg: '大屏名称已存在，请修改后重试' };
      }

      const newId = mockDashboardList.length > 0
        ? Math.max(...mockDashboardList.map(d => d.id)) + 1
        : 1;

      const now = new Date().toISOString().replace('T', ' ').substr(0, 19);

      const newDashboard: Dashboard = {
        id: newId,
        name: name.trim(),
        description,
        thumbnail: '',
        config: {},
        status: '0',
        createBy: 'admin',
        createTime: now,
        updateBy: 'admin',
        updateTime: now,
        remark
      };

      mockDashboardList.push(newDashboard);
      saveMockDashboards();

      return {
        code: 200,
        msg: '新建成功',
        data: newDashboard
      };
    }
  },
  // 删除大屏
  {
    url: /\/dev-api\/dashboard\/design\/\d+/,
    method: 'delete',
    timeout: 300,
    response: ({ url }: { url: string }) => {
      const dashboardId = url.match(/\/dashboard\/design\/(\d+)/)?.[1];
      // const index = mockDashboardList.findIndex(d => d.id === id);

      // if (index === -1) {
      //   return { code: 500, msg: '大屏不存在' };
      // }

      // mockDashboardList.splice(index, 1);
      // saveMockDashboards();

      // return {
      //   code: 200,
      //   msg: '删除成功'
      // };
      if (dashboardId) {
        const dashboardIndex = mockDashboardList.findIndex(u => u.id === parseInt(dashboardId));

        if (dashboardIndex !== -1) {
          mockDashboardList.splice(dashboardIndex, 1);
          saveMockDashboards();
          return {
            code: 200,
            msg: '删除成功'
          };
        }
      }
      return { code: 500, msg: '大屏不存在', data: null };
    }
  },
  // 获取大屏详情（编辑时加载配置）
  {
    url: /\/dev-api\/datav\/dashboard\/\d+/,
    method: 'get',
    timeout: 200,
    response: ({ url }: { url: string }) => {
      const id = Number(url.match(/\/dashboard\/(\d+)/)?.[1]);
      const dashboard = mockDashboardList.find(d => d.id === id);

      if (!dashboard) {
        return { code: 500, msg: '大屏不存在' };
      }

      return {
        code: 200,
        msg: '操作成功',
        data: dashboard
      };
    }
  },

  // 保存大屏（编辑器保存）
  {
    url: '/dev-api/datav/dashboard',
    method: 'put',
    timeout: 500,
    response: ({ body }: { body: any }) => {
      const { id, name, description, config, thumbnail, remark } = body;
      const index = mockDashboardList.findIndex(d => d.id === Number(id));

      if (index === -1) {
        return { code: 500, msg: '大屏不存在' };
      }

      // 检查重名（排除自己）
      const nameExist = mockDashboardList.find(d => d.name === name && d.id !== Number(id));
      if (nameExist) {
        return { code: 500, msg: '大屏名称已存在' };
      }

      const now = new Date().toISOString().replace('T', ' ').substr(0, 19);

      mockDashboardList[index] = {
        ...mockDashboardList[index],
        name: name || mockDashboardList[index].name,
        description: description || mockDashboardList[index].description,
        thumbnail: thumbnail || mockDashboardList[index].thumbnail,
        config: config || mockDashboardList[index].config,
        remark: remark || mockDashboardList[index].remark,
        updateBy: 'admin',
        updateTime: now
      };

      saveMockDashboards();

      return {
        code: 200,
        msg: '保存成功'
      };
    }
  },
  // 发布 / 取消发布
  {
    url: '/dev-api/datav/dashboard/changeStatus',
    method: 'put',
    timeout: 200,
    response: ({ body }: { body: any }) => {
      const { id, status } = body;
      const dashboard = mockDashboardList.find(d => d.id === Number(id));

      if (!dashboard) {
        return { code: 500, msg: '大屏不存在' };
      }

      dashboard.status = String(status); // '0' 草稿 '1' 已发布
      dashboard.updateTime = new Date().toISOString().replace('T', ' ').substr(0, 19);
      saveMockDashboards();

      return {
        code: 200,
        msg: '操作成功'
      };
    }
  }

] as MockMethod[];
