import request from '@/utils/request'

export default {
    addGoods(obj) {
        return request({
            url: '/goods/add',
            method: 'post',
            data:obj
        })
    },
    getGoodsList(obj) {
        return request({
            url: '/goods/list',
            method: 'post',
            data: obj
        })
    },
    publishedGoods(obj) {
        return request({
            url: '/goods/publish',
            method: 'post',
            data: obj
        })
    },
    updateStock(obj) {
        return request({
            url: '/goods/stock',
            method: 'post',
            data: obj
        })
    },
    removeStock(id) {
        return request({
            url: `/goods/remove${id}`,
            method: 'post'
        })
    },
    getGoodsDetail(id) {
        return request({
            url: `/goods/detail/${id}`,
            method: 'get'
        })
    },
    updateGoods(obj) {
        return request({
            url: '/goods/update',
            method: 'post',
            data: obj
        })
    },
    removeGoods(id) {
        return request({
            url: `/goods/remove/${id}`,
            method: 'post'
        })
    }
}