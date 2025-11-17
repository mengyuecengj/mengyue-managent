import { MockMethod } from 'vite-plugin-mock';

// Define the interface for a department item
interface DeptItem {
  createBy: string | null;
  createTime: string;
  updateBy: string | null;
  updateTime: string | null;
  remark: string | null;
  deptId: number;
  parentId: number;
  ancestors: string;
  deptName: string;
  orderNum: number;
  leader: string;
  phone: string;
  email: string;
  status: string;
  delFlag: string;
  parentName: string | null;
  children: DeptItem[];
  id?: number; // Optional, for compatibility with frontend tree components
  label?: string; // Optional, for compatibility with frontend tree components
}

// Helper function to build the tree structure from flat data
function buildDeptTree(deptList: DeptItem[]): DeptItem[] {
  const deptMap = new Map<number, DeptItem>();
  const tree: DeptItem[] = [];

  // Create a map for quick lookup by deptId
  deptList.forEach(dept => {
    deptMap.set(dept.deptId, {
      ...dept,
      id: dept.deptId, // Add id for frontend compatibility
      label: dept.deptName, // Add label for frontend compatibility
      children: []
    });
  });

  // Build the tree by assigning children to their parents
  deptList.forEach(dept => {
    if (dept.parentId === 0) {
      tree.push(deptMap.get(dept.deptId)!);
    } else {
      const parent = deptMap.get(dept.parentId);
      if (parent) {
        parent.children.push(deptMap.get(dept.deptId)!);
      }
    }
  });

  // Sort children by orderNum to maintain the correct order
  tree.forEach(node => {
    node.children.sort((a, b) => a.orderNum - b.orderNum);
  });

  return tree;
}

function filterWithAncestors(list: DeptItem[], keyword: string): DeptItem[] {
    const result = new Set<number>();
    const map = new Map<number, DeptItem>();
    list.forEach(item => map.set(item.deptId, item));
    list.forEach(item => {
        if (item.deptName.toLowerCase().includes(keyword)) {
            let current = item;
            while (current) {
                if (!result.has(current.deptId)) {
                    result.add(current.deptId);
                    current = map.get(current.parentId)!;
                } else {
                    break;
                }
            }
        }
    });
    return list.filter(item => result.has(item.deptId));
}

// Mock data
const deptList: DeptItem[] = [
  {
    createBy: "admin",
    createTime: "2025-05-25 23:54:42",
    updateBy: null,
    updateTime: null,
    remark: null,
    deptId: 100,
    parentId: 0,
    ancestors: "0",
    deptName: "若依科技",
    orderNum: 0,
    leader: "若依",
    phone: "15888888888",
    email: "ry@qq.com",
    status: "0",
    delFlag: "0",
    parentName: null,
    children: []
  },
  {
    createBy: "admin",
    createTime: "2025-05-25 23:54:42",
    updateBy: null,
    updateTime: null,
    remark: null,
    deptId: 101,
    parentId: 100,
    ancestors: "0,100",
    deptName: "深圳总公司",
    orderNum: 1,
    leader: "若依",
    phone: "15888888888",
    email: "ry@qq.com",
    status: "0",
    delFlag: "0",
    parentName: null,
    children: []
  },
  {
    createBy: "admin",
    createTime: "2025-05-25 23:54:42",
    updateBy: null,
    updateTime: null,
    remark: null,
    deptId: 102,
    parentId: 100,
    ancestors: "0,100",
    deptName: "长沙分公司",
    orderNum: 2,
    leader: "若依",
    phone: "15888888888",
    email: "ry@qq.com",
    status: "0",
    delFlag: "0",
    parentName: null,
    children: []
  },
  {
    createBy: "admin",
    createTime: "2025-05-25 23:54:42",
    updateBy: null,
    updateTime: null,
    remark: null,
    deptId: 103,
    parentId: 101,
    ancestors: "0,100,101",
    deptName: "研发部门",
    orderNum: 1,
    leader: "若依",
    phone: "15888888888",
    email: "ry@qq.com",
    status: "0",
    delFlag: "0",
    parentName: null,
    children: []
  },
  {
    createBy: "admin",
    createTime: "2025-05-25 23:54:42",
    updateBy: null,
    updateTime: null,
    remark: null,
    deptId: 104,
    parentId: 101,
    ancestors: "0,100,101",
    deptName: "市场部门",
    orderNum: 2,
    leader: "若依",
    phone: "15888888888",
    email: "ry@qq.com",
    status: "0",
    delFlag: "0",
    parentName: null,
    children: []
  },
  {
    createBy: "admin",
    createTime: "2025-05-25 23:54:42",
    updateBy: null,
    updateTime: null,
    remark: null,
    deptId: 105,
    parentId: 101,
    ancestors: "0,100,101",
    deptName: "测试部门",
    orderNum: 3,
    leader: "若依",
    phone: "15888888888",
    email: "ry@qq.com",
    status: "0",
    delFlag: "0",
    parentName: null,
    children: []
  },
  {
    createBy: "admin",
    createTime: "2025-05-25 23:54:42",
    updateBy: null,
    updateTime: null,
    remark: null,
    deptId: 106,
    parentId: 101,
    ancestors: "0,100,101",
    deptName: "财务部门",
    orderNum: 4,
    leader: "若依",
    phone: "15888888888",
    email: "ry@qq.com",
    status: "0",
    delFlag: "0",
    parentName: null,
    children: []
  },
  {
    createBy: "admin",
    createTime: "2025-05-25 23:54:42",
    updateBy: null,
    updateTime: null,
    remark: null,
    deptId: 107,
    parentId: 101,
    ancestors: "0,100,101",
    deptName: "运维部门",
    orderNum: 5,
    leader: "若依",
    phone: "15888888888",
    email: "ry@qq.com",
    status: "0",
    delFlag: "0",
    parentName: null,
    children: []
  },
  {
    createBy: "admin",
    createTime: "2025-05-25 23:54:42",
    updateBy: null,
    updateTime: null,
    remark: null,
    deptId: 108,
    parentId: 102,
    ancestors: "0,100,102",
    deptName: "市场部门",
    orderNum: 1,
    leader: "若依",
    phone: "15888888888",
    email: "ry@qq.com",
    status: "0",
    delFlag: "0",
    parentName: null,
    children: []
  },
  {
    createBy: "admin",
    createTime: "2025-05-25 23:54:42",
    updateBy: null,
    updateTime: null,
    remark: null,
    deptId: 109,
    parentId: 102,
    ancestors: "0,100,102",
    deptName: "财务部门",
    orderNum: 2,
    leader: "若依",
    phone: "15888888888",
    email: "ry@qq.com",
    status: "0",
    delFlag: "0",
    parentName: null,
    children: []
  }
];

// Define the response interface
interface MockResponse {
  msg: string;
  code: number;
  data: DeptItem[];
}

// Mock configuration
export default [
  {
    url: '/dev-api/system/dept/list',
    method: 'get',
    timeout: 200,
    response: ({ query }): MockResponse => {
        let rows = deptList;
        if (query.deptName && query.deptName.trim() !== "") {
            const keyword = query.deptName.trim().toLowerCase();
            rows = filterWithAncestors(deptList, keyword);
        }
        if (query.status && query.status.trim() !== "") {
            rows = rows.filter(item => item.status === query.status);
        }
        return {
            msg: '操作成功',
            code: 200,
            data: buildDeptTree(rows)
        }
    }
  }
] as MockMethod[];