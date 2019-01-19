let fs = require('fs');

module.exports = {
    getCredentials: function(config) {
		// Certificate
		const privateKey = fs.readFileSync(config.https_configuration.privkey_path, 'utf8');
		const certificate = fs.readFileSync(config.https_configuration.cert_path, 'utf8');
		const ca = fs.readFileSync(config.https_configuration.chain_path, 'utf8');

		const credentials = {
			key: privateKey,
			cert: certificate,
			ca: ca
		};

		return credentials;
	}
}