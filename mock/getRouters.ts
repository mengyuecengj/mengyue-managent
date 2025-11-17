// mock/menu.ts
import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/dev-api/getRouters',
    method: 'get',
    timeout: 200,
    response: () => {
      return {
        msg: '操作成功',
        code: 200,
        data: [
          {
            name: 'Dashboard',
            path: '/dashboard',
            hidden: false,
            redirect: 'noRedirect',
            component: 'Layout',
            alwaysShow: true,
            meta: {
              title: '数据大屏',
              icon: 'fullscreen',
              noCache: false,
              link: null
            },
            children: [
              {
                name: 'display',
                path: 'display',
                hidden: false,
                component: 'dashboard/display/index',
                meta: {
                  title: '数据大屏展示',
                  icon: 'peoples',
                  noCache: false,
                  link: null,
                  fullscreen: true
                }
              },
              // {
              //   name: 'desgin',
              //   path: 'desgin',
              //   hidden: false,
              //   component: 'dashboard/design/index',
              //   meta: {
              //     title: '数据大屏设计',
              //     icon: 'peoples',
              //     noCache: false,
              //     link: null
              //   }
              // }
            ]
          },
          {
            name: 'System',
            path: '/system',
            hidden: false,
            redirect: 'noRedirect',
            component: 'Layout',
            alwaysShow: true,
            meta: {
              title: '系统管理',
              icon: 'system',
              noCache: false,
              link: null
            },
            children: [
              {
                name: 'User',
                path: 'user',
                hidden: false,
                component: 'system/user/index',
                meta: {
                  title: '用户管理',
                  icon: 'user',
                  noCache: false,
                  link: null
                }
              },
              {
                name: 'Role',
                path: 'role',
                hidden: false,
                component: 'system/role/index',
                meta: {
                  title: '角色管理',
                  icon: 'peoples',
                  noCache: false,
                  link: null
                }
              },
              {
                name: 'Menu',
                path: 'menu',
                hidden: false,
                component: 'system/menu/index',
                meta: {
                  title: '菜单管理',
                  icon: 'tree-table',
                  noCache: false,
                  link: null
                }
              },
              {
                name: 'Dept',
                path: 'dept',
                hidden: false,
                component: 'system/dept/index',
                meta: {
                  title: '部门管理',
                  icon: 'tree',
                  noCache: false,
                  link: null
                }
              },
              {
                name: 'Post',
                path: 'post',
                hidden: false,
                component: 'system/post/index',
                meta: {
                  title: '岗位管理',
                  icon: 'post',
                  noCache: false,
                  link: null
                }
              },
              {
                name: 'Dict',
                path: 'dict',
                hidden: false,
                component: 'system/dict/index',
                meta: {
                  title: '字典管理',
                  icon: 'dict',
                  noCache: false,
                  link: null
                }
              },
              {
                name: 'Config',
                path: 'config',
                hidden: false,
                component: 'system/config/index',
                meta: {
                  title: '参数设置',
                  icon: 'edit',
                  noCache: false,
                  link: null
                }
              },
              {
                name: 'Notice',
                path: 'notice',
                hidden: false,
                component: 'system/notice/index',
                meta: {
                  title: '通知公告',
                  icon: 'message',
                  noCache: false,
                  link: null
                }
              },
              {
                name: 'Log',
                path: 'log',
                hidden: false,
                redirect: 'noRedirect',
                component: 'ParentView',
                alwaysShow: true,
                meta: {
                  title: '日志管理',
                  icon: 'log',
                  noCache: false,
                  link: null
                },
                children: [
                  {
                    name: 'Operlog',
                    path: 'operlog',
                    hidden: false,
                    component: 'monitor/operlog/index',
                    meta: {
                      title: '操作日志',
                      icon: 'form',
                      noCache: false,
                      link: null
                    }
                  },
                  {
                    name: 'Logininfor',
                    path: 'logininfor',
                    hidden: false,
                    component: 'monitor/logininfor/index',
                    meta: {
                      title: '登录日志',
                      icon: 'logininfor',
                      noCache: false,
                      link: null
                    }
                  }
                ]
              }
            ]
          },
          {
            name: 'Monitor',
            path: '/monitor',
            hidden: false,
            redirect: 'noRedirect',
            component: 'Layout',
            alwaysShow: true,
            meta: {
              title: '系统监控',
              icon: 'monitor',
              noCache: false,
              link: null
            },
            children: [
              {
                name: 'Online',
                path: 'online',
                hidden: false,
                component: 'monitor/online/index',
                meta: {
                  title: '在线用户',
                  icon: 'online',
                  noCache: false,
                  link: null
                }
              },
              // {
              //   name: 'Job',
              //   path: 'job',
              //   hidden: false,
              //   component: 'monitor/job/index',
              //   meta: {
              //     title: '定时任务',
              //     icon: 'job',
              //     noCache: false,
              //     link: null
              //   }
              // },
              // {
              //   name: 'Druid',
              //   path: 'druid',
              //   hidden: false,
              //   component: 'monitor/druid/index',
              //   meta: {
              //     title: '数据监控',
              //     icon: 'druid',
              //     noCache: false,
              //     link: null
              //   }
              // },
              {
                name: 'Server',
                path: 'server',
                hidden: false,
                component: 'monitor/server/index',
                meta: {
                  title: '服务监控',
                  icon: 'server',
                  noCache: false,
                  link: null
                }
              },
              {
                name: 'Cache',
                path: 'cache',
                hidden: false,
                component: 'monitor/cache/index',
                meta: {
                  title: '缓存监控',
                  icon: 'redis',
                  noCache: false,
                  link: null
                }
              },
              // {
              //   name: 'CacheList',
              //   path: 'cacheList',
              //   hidden: false,
              //   component: 'monitor/cache/list',
              //   meta: {
              //     title: '缓存列表',
              //     icon: 'redis-list',
              //     noCache: false,
              //     link: null
              //   }
              // }
            ]
          },
          {
            name: 'Tool',
            path: '/tool',
            hidden: false,
            redirect: 'noRedirect',
            component: 'Layout',
            alwaysShow: true,
            meta: {
              title: '系统工具',
              icon: 'tool',
              noCache: false,
              link: null
            },
            children: [
              {
                name: 'Build',
                path: 'build',
                hidden: false,
                component: 'tool/builder/index',
                meta: {
                  title: '表单构建',
                  icon: 'build',
                  noCache: false,
                  link: null
                }
              },
              // {
              //   name: 'Gens',
              //   path: 'gens',
              //   hidden: false,
              //   component: 'tool/gens/index',
              //   meta: {
              //     title: '代码生成',
              //     icon: 'code',
              //     noCache: false,
              //     link: null
              //   }
              // },
              // {
              //   name: 'Gen',
              //   path: 'gen',
              //   hidden: false,
              //   component: 'tool/gen/index',
              //   meta: {
              //     title: '单页生成',
              //     icon: 'slider',
              //     noCache: false,
              //     link: null
              //   }
              // },
              // {
              //   name: 'Swagger',
              //   path: 'swagger',
              //   hidden: false,
              //   component: 'tool/swagger/index',
              //   meta: {
              //     title: '系统接口',
              //     icon: 'swagger',
              //     noCache: false,
              //     link: null
              //   }
              // }
            ]
          },
          // {
          //   name: 'Ai',
          //   path: '/ai',
          //   hidden: false,
          //   redirect: 'noRedirect',
          //   component: 'Layout',
          //   alwaysShow: true,
          //   meta: {
          //     title: 'AI智能助手',
          //     icon: 'swagger',
          //     noCache: false,
          //     link: null
          //   },
          //   children: [
          //     {
          //       name: 'deepseek',
          //       path: 'ai',
          //       hidden: false,
          //       component: 'ai/index',
          //       meta: {
          //         title: 'deepseek',
          //         icon: 'swagger',
          //         noCache: false,
          //         link: null
          //       }
          //     }
          //   ]
          // },
          {
            name: 'Api',
            path: '/api',
            hidden: false,
            redirect: 'noRedirect',
            component: 'Layout',
            alwaysShow: true,
            meta: {
              title: '接口参考文档',
              icon: 'swagger',
              noCache: false,
              link: null
            },
            children: [
              {
                name: 'apiLeading',
                path: 'leading',
                hidden: false,
                component: 'api/apiLeading',
                meta: {
                  title: '前置',
                  icon: 'slider',
                  noCache: false,
                  link: null
                }
              },
              {
                name: 'ApiSystem',
                path: 'system',
                hidden: false,
                redirect: 'noRedirect',
                component: 'ParentView',  // 二级菜单使用 ParentView
                alwaysShow: true,
                meta: {
                  title: '系统管理接口文档',
                  icon: 'system',
                  noCache: false,
                  link: null
                },
                children: [
                  {
                    name: 'ApiUser',
                    path: 'user',
                    hidden: false,
                    component: 'api/system/apiUser',  // 三级菜单使用具体组件
                    meta: {
                      title: '用户管理接口文档',
                      icon: 'user',
                      noCache: false,
                      link: null
                    }
                  },
                  {
                    name: 'ApiRole',
                    path: 'role',
                    hidden: false,
                    component: 'api/system/apiRole',
                    meta: {
                      title: '角色管理接口文档',
                      icon: 'peoples',
                      noCache: false,
                      link: null
                    }
                  },
                  {
                    name: 'ApiMenu',
                    path: 'menu',
                    hidden: false,
                    component: 'api/system/apiMenu',
                    meta: {
                      title: '菜单管理接口文档',
                      icon: 'tree-table',
                      noCache: false,
                      link: null
                    }
                  },
                  {
                    name: 'ApiDept',
                    path: 'dept',
                    hidden: false,
                    component: 'api/system/apiDept',
                    meta: {
                      title: '部门管理接口文档',
                      icon: 'tree',
                      noCache: false,
                      link: null
                    }
                  },
                  {
                    name: 'ApiDict',
                    path: 'dict',
                    hidden: false,
                    component: 'api/system/apiDict',
                    meta: {
                      title: '字典管理接口文档',
                      icon: 'dict',
                      noCache: false,
                      link: null
                    }
                  },
                  {
                    name: 'ApiConfig',
                    path: 'config',
                    hidden: false,
                    component: 'api/system/apiConfig',
                    meta: {
                      title: '参数管理接口文档',
                      icon: 'edit',
                      noCache: false,
                      link: null
                    }
                  },
                  {
                    name: 'ApiNotice',
                    path: 'notice',
                    hidden: false,
                    component: 'api/system/apiNotice',
                    meta: {
                      title: '通知公告接口文档',
                      icon: 'message',
                      noCache: false,
                      link: null
                    }
                  },
                  {
                    name: 'ApiLog',
                    path: 'log',
                    hidden: false,
                    component: 'ParentView',
                    alwaysShow: true,
                    meta: {
                      title: '日志管理接口文档',
                      icon: 'log',
                      noCache: false,
                      link: null
                    },
                    children: [
                      {
                        name: 'ApiOperlog',
                        path: 'operlog',
                        hidden: false,
                        component: 'api/system/apiOperlog',
                        meta: {
                          title: '操作日志接口文档',
                          icon: 'form',
                          noCache: false,
                          link: null
                        }
                      },
                      {
                        name: 'ApiLogininfor',
                        path: 'logininfor',
                        hidden: false,
                        component: 'api/system/apiLogininfor',
                        meta: {
                          title: '登录日志接口文档',
                          icon: 'logininfor',
                          noCache: false,
                          link: null
                        }
                      },
                    ]
                  }
                ]
              },
              {
                name: 'ApiMonitor',
                path: 'monitor',
                hidden: false,
                redirect: 'noRedirect',
                component: 'ParentView',
                alwaysShow: true,
                meta: {
                  title: '系统监控接口',
                  icon: 'monitor',
                  noCache: false,
                  link: null
                },
                children: [
                  {
                    name: 'ApiOnline',
                    path: 'online',
                    hidden: false,
                    component: 'api/monitor/apiOnline',
                    meta: {
                      title: '在线用户接口文档',
                      icon: 'online',
                      noCache: false,
                      link: null
                    }
                  },
                  {
                    name: 'ApiServer',
                    path: 'server',
                    hidden: false,
                    component: 'api/monitor/apiServer',
                    meta: {
                      title: '服务监控接口文档',
                      icon: 'server',
                      noCache: false,
                      link: null
                    }
                  },
                  {
                    name: 'ApiCache',
                    path: 'cache',
                    hidden: false,
                    component: 'api/monitor/apiCache',
                    meta: {
                      title: '缓存监控接口文档',
                      icon: 'redis',
                      noCache: false,
                      link: null
                    }
                  }
                ]
              }
            ]
          }
        ]
      };
    }
  }
] as MockMethod[];
