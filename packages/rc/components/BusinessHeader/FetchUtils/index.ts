import {http} from '../../configure';

export const getUserInfo=(projectName)=>{
    const url=`/auth/global/${projectName}/common/getMiniMenu.htm`;
    return http({
        url,
        method: 'get',
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    }).then(res=>res);
};
