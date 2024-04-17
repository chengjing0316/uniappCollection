import qs from 'qs';
export const request = (param) => {
	return new Promise((resolve, reject) => {
		const url = param.otherUrl ? param.otherUrl : import.meta.env?.VITE_APP_BASE_API
		if (param.isLoading !== false) {
			uni.showLoading({
				title: '加载中...'
			});
		}
		if (param.method === 'delete' || param.method === 'DELETE' ||
			param.method === 'put' || param.method === 'PUT') {
			const paramUrl = qs.stringify(param.data)
			param.data = undefined
			param.url = `${param.url}?${paramUrl}`
		}
		uni.request({
			url: url + param.url,
			method: param.method,
			data: param.data,
			header: param.header || {
				'content-type': 'application/json'
			},
			success (res) {
				const { data } = res
				if (data.code === 0) {
					resolve(res.data)
				} else {
					uni.showToast({
						title: data.msg || '系统错误！',
						icon: 'error',
						duration: 3000
					})
					reject(res.data)
				}
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
		
	})
}