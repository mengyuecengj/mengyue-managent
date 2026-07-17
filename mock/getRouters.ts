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
              title: 'menu.dashboardIndex',
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
                  title: 'menu.dashboardDisplay',
                  icon: 'fullscreen',
                  noCache: false,
                  link: null,
                  fullscreen: true
                }
              },
              {
                name: 'design',
                path: 'design',
                hidden: false,
                redirect: '/dashboard/design/list',
                meta: {
                  title: 'menu.dashboardDesign',
                  icon: 'fullscreen',
                  noCache: false,
                  link: null
                },
                children: [
                  {
                    name: 'DashboardDesignList',
                    path: 'list',
                    component: 'dashboard/design/index',
                    meta: {
                      title: 'menu.dashboardDesign',
                      noCache: false
                    }
                  },
                  {
                    name: 'DashboardEditor',
                    path: 'editor/:id?',
                    hidden: true,
                    component: 'dashboard/design/editor',
                    meta: {
                      title: '大屏编辑器',
                      activeMenu: '/dashboard/design/list',
                      noLayout: true
                    }
                  }
                ]
              },
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
              title: 'menu.systemManagement',
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
                  title: 'menu.userManagement',
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
                  title: 'menu.roleManagement',
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
                  title: 'menu.menuManagement',
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
                  title: 'menu.deptManagement',
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
                  title: 'menu.postManagement',
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
                  title: 'menu.dictManagement',
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
                  title: 'menu.configManagement',
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
                  title: 'menu.notice',
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
                  title: 'menu.logManagement',
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
                      title: 'menu.operateLog',
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
                      title: 'menu.loginLog',
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
              title: 'menu.systemMonitor',
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
                  title: 'menu.onlineUser',
                  icon: 'online',
                  noCache: false,
                  link: null
                }
              },
              {
                name: 'Server',
                path: 'server',
                hidden: false,
                component: 'monitor/server/index',
                meta: {
                  title: 'menu.serverMonitor',
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
                  title: 'menu.cacheMonitor',
                  icon: 'redis',
                  noCache: false,
                  link: null
                }
              },
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
              title: 'menu.systemUtils',
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
                  title: 'menu.buildForm',
                  icon: 'build',
                  noCache: false,
                  link: null
                }
              },
            ]
          },
          {
            name: 'Api',
            path: '/api',
            hidden: false,
            redirect: 'noRedirect',
            component: 'Layout',
            alwaysShow: true,
            meta: {
              title: 'menu.apiDocs',
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
                  title: 'menu.leading',
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
                component: 'ParentView',
                alwaysShow: true,
                meta: {
                  title: 'menu.systemApiDocs',
                  icon: 'system',
                  noCache: false,
                  link: null
                },
                children: [
                  {
                    name: 'ApiUser',
                    path: 'user',
                    hidden: false,
                    component: 'api/system/apiUser',
                    meta: {
                      title: 'menu.userApiDocs',
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
                      title: 'menu.roleApiDocs',
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
                      title: 'menu.menuApiDocs',
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
                      title: 'menu.deptApiDocs',
                      icon: 'tree',
                      noCache: false,
                      link: null
                    }
                  },
                  {
                    name: 'ApiPost',
                    path: 'post',
                    hidden: false,
                    component: 'api/system/apiPost',
                    meta: {
                      title: 'menu.postApiDocs',
                      icon: 'post',
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
                      title: 'menu.dictApiDocs',
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
                      title: 'menu.configApiDocs',
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
                      title: 'menu.noticeApiDocs',
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
                      title: 'menu.logApiDocs',
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
                          title: 'menu.operApiDocs',
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
                          title: 'menu.loginApiDocs',
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
                  title: 'menu.systemMonitor',
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
                      title: 'menu.onlineApiDocs',
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
                      title: 'menu.serverApiDocs',
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
                      title: 'menu.cacheApiDocs',
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
