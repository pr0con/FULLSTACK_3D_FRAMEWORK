function logData(message) {
	let d = new Date();
	var time = '['+ d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() +']';
	console.log(time + message);
}

const system_configuration = {
	"letsencrypt": {
		"public_key_path": "/etc/letsencrypt/live/oauth.pr0con.io/fullchain.pem",
		"private_key_path": "/etc/letsencrypt/live/oauth.pr0con.io/privkey.pem"
	}
}

module.exports = {
	logData,
	system_configuration,
	
	ArrayBufferToString: function(buffer, encoding) {
		if(encoding == null) encoding = 'utf8';
		return Buffer.from(buffer).toString(encoding);
	},
}