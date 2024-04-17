import { useStore } from '@/store'
export const getFileList = (priUrl:string) => {
	if (priUrl) {
		return priUrl.split(',')
	}
	return []
}
export const $getImgUrl = (imgName:string) => {
	const useCounter:any = useStore()
	return useCounter.v_imgurl + imgName
}
export const $getIconUrl = (imgName:string) => {
	const useCounter:any = useStore()
	return useCounter.v_iconurl + imgName
}

// 获取链接中的文件及后缀
export const getFileNameAndExtension = (url:string) => {
	var fileName = url.substring(url.lastIndexOf('/') + 1);
	var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
	return {
		fileName: fileName,
		fileExtension: fileExtension
	}
}
export const getTimeToDate = (timestamp:number, type='D') => {
  const date = timestamp ? new Date(timestamp) : new Date()
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    const hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
    const ii = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    const ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    if (type === 'Y') {
    //年
        const str = (Y + M).substring(0, (Y + M).length - 1)
        return str
    } else if (type === 'M') {
    //年月
        return Y + M
    } else if (type === 'D') {
    //年月日
        return Y + M + D
    } else if (type === 'H') {
    //年月日时
        return Y + M + D + ' ' + hh
    } else if (type === 'M') {
    //年月日时分
        return Y + M + D + ' ' + hh + ':' + ii
    } else if (type === 'HMS') {
      //时分秒
      return hh + ':' + ii + ':' + ss
    } else {
      //年月日时分秒
      return Y + M + D + ' ' + hh + ':' + ii + ':' + ss
    }
}