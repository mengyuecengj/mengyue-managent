import axios, { AxiosResponse } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { saveAs } from 'file-saver'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { blobValidate } from '@/utils/general'
import { LoadingInstance, DownloadModule, SaveAsOptions, ErrorResponse, ErrorCodeMap } from '@/types/components/download'

const baseURL = import.meta.env.VITE_APP_BASE_API
let downloadLoadingInstance: LoadingInstance | undefined;

const downloadModule: DownloadModule = {
  name(name: string, isDelete: boolean = true): void {
    const url = `${baseURL}/common/download?fileName=${encodeURIComponent(name)}&delete=${isDelete}`;
    axios({
      method: 'get',
      url,
      responseType: 'blob',
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then((res: AxiosResponse<Blob>) => {
      // const data = res.data;
      // const headers = res.headers as DownloadHeaders;
      const isBlob = blobValidate(res.data);
      if (isBlob) {
        const blob = new Blob([res.data]);
        downloadModule.saveAs(
          blob,
          decodeURIComponent(res.headers['download-filename'] || name)
        );
      } else {
        downloadModule.printErrMsg(res.data);
      }
    });
  },

  resource(resource: string): void {
    const url = `${baseURL}/common/download/resource?resource=${encodeURIComponent(resource)}`;
    axios({
      method: 'get',
      url,
      responseType: 'blob',
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then((res: AxiosResponse<Blob>) => {
      const isBlob = blobValidate(res.data);
      if (isBlob) {
        const blob = new Blob([res.data]);
        downloadModule.saveAs(
          blob,
          decodeURIComponent(res.headers['download-filename'] || resource)
        );
      } else {
        downloadModule.printErrMsg(res.data);
      }
    });
  },

  zip(url: string, name: string): void {
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
      .then((res: AxiosResponse<Blob>) => {
        const isBlob = blobValidate(res.data);
        if (isBlob) {
          const blob = new Blob([res.data], { type: 'application/zip' });
          downloadModule.saveAs(blob, name);
        } else {
          downloadModule.printErrMsg(res.data);
        }
        downloadLoadingInstance?.close();
      })
      .catch((error: unknown) => {
        console.error(error);
        ElMessage.error('下载文件出现错误，请联系管理员！');
        downloadLoadingInstance?.close();
      });
  },

  saveAs(text: Blob | string, name: string, opts?: SaveAsOptions): void {
    saveAs(text, name);
  },

  async printErrMsg(data: Blob): Promise<void> {
    const resText = await data.text();
    const rspObj: ErrorResponse = JSON.parse(resText);
    const errMsg: string =
      (errorCode as ErrorCodeMap)[rspObj.code] ||
      rspObj.msg ||
      (errorCode as ErrorCodeMap)['default'];
    ElMessage.error(errMsg);
  },
};

export default downloadModule;