// mock/index.ts
import { MockMethod } from 'vite-plugin-mock';
import loginModule from './login';
import dictModule from './system/dict/data';
import noticeModule from './system/notice';

export default [
  ...loginModule,
  ...dictModule,
  ...noticeModule
] as MockMethod[];
