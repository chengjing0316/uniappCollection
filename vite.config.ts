import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		uni(),
	],
	server: {
	  // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0" 也可设置成你的ip地址
	  host: '0.0.0.0',
	  port: 8099,
	  open: false,
	  https: false,
	  cors: true,
	  // 代理跨域（模拟示例）
	  proxy: {
		// "/api": {
		//   target: "", // easymock
		//   changeOrigin: true,
		//   rewrite: path => path.replace(/^\/api/, "")
		// }
	  }
	},
});
