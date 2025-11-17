import request from '@/utils/request';
export function optionselect() {
    return request({
        url: '/tool/gen/optionselect',
        method: 'get'
    });
}
