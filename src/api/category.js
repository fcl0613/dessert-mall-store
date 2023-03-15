import request from '@/utils/request'

export default {
    getCategoryList() {
        return request({
            url: '/category/all',
            method: 'get'
        })
    }
}