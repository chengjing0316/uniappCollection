// 定义加密/解密算法
import CryptoJs, { AES, enc } from 'crypto-js';
const cryptoKey = '1024-jyc'
// 加密
export const encryptedData = (data?: string) => {
    if (!data) return "";
	return AES.encrypt(data, cryptoKey).toString();
}
// 解密
export const decryptedData = (data?: string) => {
    if (!data) return "";
	return AES.decrypt(data, cryptoKey).toString(enc.Utf8);
}
// MD5 加密 (无法解密)
export function MD5_Encrypt (data?: string): string {
    if (!data) return "";
    return CryptoJs.MD5(String(data)).toString();
};
