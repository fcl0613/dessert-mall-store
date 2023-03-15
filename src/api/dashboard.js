import request from '@/utils/request'

export default {
    getDashboardData(){
        return request({
            url: '/dashboard',
            method: 'get'
        })
    }
}