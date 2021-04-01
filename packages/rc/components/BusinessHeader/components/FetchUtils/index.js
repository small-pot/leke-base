import {http} from '../../../configure';

export const getUserInfo=(projectName)=>{
    const url='/auth/global/webapp/common/getMiniMenu.htm';
    return http({
        url,
        method: 'get',
        withCredentials: true,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    }).then(res=>res);
};
