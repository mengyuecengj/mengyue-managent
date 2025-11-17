import { ElForm } from 'element-plus';

// Define interfaces for type safety
export interface DictData {
    value: string;
    label: string;
}

export interface Dept {
    deptId: number;
    parentId: number;
    deptName: string;
    orderNum: number;
    leader?: string;
    phone?: string;
    email?: string;
    status: string;
    createTime?: string;
    children?: Dept[];
    hasChildren?: boolean;
}

export interface QueryParams {
    deptName?: string;
    status?: string;
}

export interface FormData {
    deptId?: number;
    parentId?: number;
    deptName?: string;
    orderNum: number;
    leader?: string;
    phone?: string;
    email?: string;
    status: string;
}

export interface FormRules {
    parentId?: Array<{ required: boolean; message: string; trigger: string }>;
    deptName?: Array<{ required: boolean; message: string; trigger: string }>;
    orderNum?: Array<{ required: boolean; message: string; trigger: string }>;
    email?: Array<{ type: 'email'; message: string; trigger: string[] }>;
    phone?: Array<{ pattern: RegExp; message: string; trigger: string }>;
}

// Type for proxy (getCurrentInstance)
export interface ProxyInstance {
    $refs: {
        queryRef?: InstanceType<typeof ElForm>;
        deptRef?: InstanceType<typeof ElForm>;
    };
    $message: {
        success: (message: string) => void;
    };
    resetForm: (refName: string) => void;
    handleTree: <T>(data: T[], idField: string) => Dept[];
    useDict: (dictType: string) => { sys_normal_disable: DictData[] };
}
