export default class WebSocketService {
	constructor() {
		this.ws = null;
		this.url = "/ws";
		this.isConnected = false;
		this.callbacks = new Map(); //存储消息回调函数
	}
	connect() {
		if (this.isConnected) return;
		this.ws = new WebSocket(this.url);

		//连接
		this.ws.onopen = () => {
			console.log("WebSocket 连接成功");
			this.isConnected = true;
			this.trigger("open"); // 触发 open 回调
		};
		// 接收消息
		this.ws.onmessage = (event) => {
			console.log("收到消息：", event.data);
			this.trigger("message", event.data); // 触发 message 回调
		};
		// 连接关闭
		this.ws.onclose = () => {
			console.log("WebSocket 连接关闭");
			this.isConnected = false;
			this.trigger("close"); // 触发 close 回调
			// 自动重连（可选）
			setTimeout(() => this.connect(), 3000);
		};

		// 错误处理
		this.ws.onerror = (error) => {
			console.error("WebSocket 错误：", error);
			this.trigger("error", error); // 触发 error 回调
		};
	}
	// 关闭连接
	close() {
		if (this.ws) {
			this.ws.close();
			this.ws = null;
			this.isConnected = false;
		}
	}

	// 注册回调函数（例如：on('message', (data) => { ... })）
	on(eventType, callback) {
		this.callbacks.set(eventType, callback);
	}

	// 触发回调函数
	trigger(eventType, data) {
		const callback = this.callbacks.get(eventType);
		if (callback) {
			callback(data);
		}
	}
}
