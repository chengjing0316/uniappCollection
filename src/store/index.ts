interface MyState {
  key: string;
  data: any;
}
import { defineStore } from 'pinia'
import { encryptedData, decryptedData } from '@/utils/crypto'
const storeData:any = {
	state: {},
    getters: {},
	actions: {}
}
// 汇聚处理modules的文件start
const modules:any = import.meta.globEager("./modules/*.ts")  
Object.keys(storeData).forEach((key) => {
	for(let item in modules) {
		const fileData = modules[item].default[key]
		for(let fKey in fileData) {
			storeData[key][fKey] = fileData[fKey]
		}
	}
})
// 汇聚处理modules的文件end
export const useStore = defineStore({    
    id: 'piniaData',// id: 必须的，在所有 Store 中唯一    
    state: ()=>({
		...storeData.state
	}),
    getters: {
		...storeData.getters
	},
    actions:{
		setState ({key, data}:MyState):void {
			this[key] = data
		},
		...storeData.actions
	},
    persist: { // 配置持久化，调整为兼容多端的API的写法        
		storage: {
			setItem(key, value) {
				// const val = encryptedData(value)
				// uni.setStorageSync(key, val)
				uni.setStorageSync(key, value)
			},
			getItem(key) {
				// const data = uni.getStorageSync(key)
				// return decryptedData(data)
				const data = uni.getStorageSync(key)
				return decryptedData(data)
			}
		}
    },
})
