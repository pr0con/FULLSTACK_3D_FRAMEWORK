const utils = require('./utilz.js');
const uWS = require('uWebSockets.js');

function payload(type, data) {
	let payload = {
		type,
		data
	}
	return payload
}

const app = uWS.SSLApp({
	cert_file_name: utils['system_configuration']['letsencrypt']['public_key_path'],
	key_file_name:  utils['system_configuration']['letsencrypt']['private_key_path']
}).ws('/ws', {
	compression: uWS.SHARED_COMPRESSOR,
	maxPayloadLength: 16 * 1024 * 1024,
	idleTimeout: 0,
	
	upgrade: (res,req,context) => {
		utils.logData('An Http connection wants to become a WebSocket @URL: '+req.getUrl()+'!');
		
		const upgradeAborted = { aborted: false }
		
		res.onAborted(() => {
			utils.logData('Websocket aborted connect or Foreign Address Detected...');
			upgradeAborted.aborted = true;
		});
		
		
		console.log(req.getHeader('origin'));
		
		if (req.getHeader('origin') === 'https://oauth.pr0con.io') {
			res.upgrade({url: req.getUrl()},
				req.getHeader('sec-websocket-key'),
				req.getHeader('sec-websocket-protocol'),
				req.getHeader('sec-websocket-extensions'),
				context				
			);	
		}else {
			utils.logData('Killed Foreign Request.');
			res.close(); // should fire abort operation...
		}
	},
	open: async (ws) => {
		utils.logData('A WebSocket connected with URL: '+ws.url);
		utils.logData('A WebSocket connected via address: '+utils.ArrayBufferToString(ws.getRemoteAddressAsText())+'!');
	},
	message: async (ws, message) => {
		let tjo = JSON.parse(utils.ArrayBufferToString(message));
		
		switch(tjo['type']) {
			case "node-client-test-msg":
				ws.send(JSON.stringify(payload('test-response-from-node-server', 'Hello From Node Server!!!')));
				break;
			default:
				break;
		}
	},
	drain: (ws) => {
		
	},
	close: async (ws, code, message) => {
		
	}
}).listen(1300, async (sock) => {
	(sock) ? utils.logData('Server listening : 1300') : utils.logData('Something went horribly wrong!');
});
