import request from '@/utils/request'

export default {
    login(username, password) {
        return request({
            url: '/seller/login',
            method: 'post',
            params: {
                username,
                password
            }
        })
    }
}