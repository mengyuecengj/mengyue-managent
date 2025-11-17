import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/dev-api/monitor/server',
    method: 'get',
    response: () => ({
      msg: "操作成功",
      code: 200,
      data: {
        cpu: {
          cpuNum: 8,
          total: 799600.0,
          sys: 28.71,
          used: 31.24,
          wait: 0.0,
          free: 37.91
        },
        mem: {
          total: 23.8,
          used: 15.45,
          free: 8.36,
          usage: 64.89
        },
        jvm: {
          total: 188.0,
          max: 6096.0,
          free: 65.55,
          version: "17.0.8",
          home: "E:\\after\\Java\\jdk17",
          startTime: "2025-05-26 16:53:42",
          usage: 65.14,
          used: 122.45,
          name: "Java HotSpot(TM) 64-Bit Server VM",
          inputArgs: "[-XX:TieredStopAtLevel=1, -Xverify:none, -Dspring.output.ansi.enabled=always, -javaagent:E:\\software\\develop code\\after\\idea\\idea\\IntelliJ IDEA 2021.2\\lib\\idea_rt.jar=60170:E:\\software\\develop code\\after\\idea\\idea\\IntelliJ IDEA 2021.2\\bin, -Dcom.sun.management.jmxremote, -Dspring.jmx.enabled=true, -Dspring.liveBeansView.mbeanDomain, -Dspring.application.admin.enabled=true, -Dfile.encoding=UTF-8]",
          runTime: "0天3小时34分钟"
        },
        sys: {
          computerName: "LAPTOP-BTGKGAGM",
          computerIp: "192.168.1.5",
          userDir: "E:\\after\\Java\\olddocumentzali\\ideaProject\\-Vue-master",
          osName: "Windows 11",
          osArch: "amd64"
        },
        sysFiles: [
          {
            dirName: "C:\\",
            sysTypeName: "NTFS",
            typeName: "本地固定磁盘 (C:)",
            total: "100.0 GB",
            free: "22.6 GB",
            used: "77.4 GB",
            usage: 77.36
          },
          {
            dirName: "D:\\",
            sysTypeName: "NTFS",
            typeName: "本地固定磁盘 (D:)",
            total: "375.7 GB",
            free: "117.4 GB",
            used: "258.3 GB",
            usage: 68.76
          },
          {
            dirName: "E:\\",
            sysTypeName: "NTFS",
            typeName: "本地固定磁盘 (E:)",
            total: "476.9 GB",
            free: "71.2 GB",
            used: "405.8 GB",
            usage: 85.07
          }
        ]
      }
    })
  }
] as MockMethod[];