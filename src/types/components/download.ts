export interface LoadingInstance {
  close: () => void;
}

// Type for Axios response headers
export interface DownloadHeaders {
  'download-filename'?: string;
  [key: string]: string | undefined;
}

// Type for error response object
export interface ErrorResponse {
  code: string;
  msg?: string;
}

// Type for error code mapping
export interface ErrorCodeMap {
  [code: string]: string;
  default: string;
}

// Type for module methods
export interface DownloadModule {
  name: (name: string, isDelete?: boolean) => void;
  resource: (resource: string) => void;
  zip: (url: string, name: string) => void;
  saveAs: (text: Blob | string, name: string, opts?: SaveAsOptions) => void;
  printErrMsg: (data: Blob) => Promise<void>;
}

// Type for saveAs options (minimal, based on file-saver)
export interface SaveAsOptions {
  autoBom?: boolean;
  [key: string]: any;
}