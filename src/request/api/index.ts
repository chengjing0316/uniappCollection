
import { request } from '@/request/index'
export const fileUploadUrl = '/api/File/upload/element'
//获取用户信息
export const getUserApi = (data) => {
	return request({
		url: '/api/weChatLogin/getUserInfo',
		method: "post",
		isLoading: false,
		data
	})
}