import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
import { saveAs } from 'file-saver';
import { getToken } from '@/utils/auth';
import errorCode from '@/utils/errorCode';
import { blobValidate } from '@/utils/general';
const baseURL = import.meta.env.VITE_APP_BASE_API;
let downloadLoadingInstance;
const downloadModule = {
    name(name, isDelete = true) {
        const url = `${baseURL}/common/download?fileName=${encodeURIComponent(name)}&delete=${isDelete}`;
        axios({
            method: 'get',
            url,
            responseType: 'blob',
            headers: { Authorization: `Bearer ${getToken()}` },
        }).then((res) => {
            // const data = res.data;
            // const headers = res.headers as DownloadHeaders;
            const isBlob = blobValidate(res.data);
            if (isBlob) {
                const blob = new Blob([res.data]);
                downloadModule.saveAs(blob, decodeURIComponent(res.headers['download-filename'] || name));
            }
            else {
                downloadModule.printErrMsg(res.data);
            }
        });
    },
    resource(resource) {
        const url = `${baseURL}/common/download/resource?resource=${encodeURIComponent(resource)}`;
        axios({
            method: 'get',
            url,
            responseType: 'blob',
            headers: { Authorization: `Bearer ${getToken()}` },
        }).then((res) => {
            const isBlob = blobValidate(res.data);
            if (isBlob) {
                const blob = new Blob([res.data]);
                downloadModule.saveAs(blob, decodeURIComponent(res.headers['download-filename'] || resource));
            }
            else {
                downloadModule.printErrMsg(res.data);
            }
        });
    },
    zip(url, name) {
        const fullUrl = `${baseURL}${url}`;
        downloadLoadingInstance = ElLoading.service({
            text: '正在下载数据，请稍候',
            background: 'rgba(0, 0, 0, 0.7)',
        });
        axios({
            method: 'get',
            url: fullUrl,
            responseType: 'blob',
            headers: { Authorization: `Bearer ${getToken()}` },
        })
            .then((res) => {
            const isBlob = blobValidate(res.data);
            if (isBlob) {
                const blob = new Blob([res.data], { type: 'application/zip' });
                downloadModule.saveAs(blob, name);
            }
            else {
                downloadModule.printErrMsg(res.data);
            }
            downloadLoadingInstance?.close();
        })
            .catch((error) => {
            console.error(error);
            ElMessage.error('下载文件出现错误，请联系管理员！');
            downloadLoadingInstance?.close();
        });
    },
    saveAs(text, name, opts) {
        saveAs(text, name);
    },
    async printErrMsg(data) {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        const errMsg = errorCode[rspObj.code] ||
            rspObj.msg ||
            errorCode['default'];
        ElMessage.error(errMsg);
    },
};
export default downloadModule;
