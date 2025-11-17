export interface ServerData {
  cpu?: {
    cpuNum?: number;
    used?: number;
    sys?: number;
    free?: number;
    usage?: number;
  }
  mem?: {
    total?: number;
    used?: number;
    free?: number;
    usage?: any;
  }
  sys?: {
    computerName?: string;
    computerIp?: string;
    osName?: string;
    osArch?: string;
    userDir?: string;
  }
  sysFiles?: {
    dirName?: any;
    sysTypeName?: string;
    typeName?: string;
    total?: number;
    free?: number;
    used?: number;
    usage?: number;
  }
  jvm?: {
    name?: string;
    version?: string;
    startTime?: string;
    runTime?: string;
    home?: string;
    inputArgs?: string;
    total?: string;
    used?: string;
    free?: string;
    usage: any;
  }
}