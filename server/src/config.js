module.exports = {
    http_port: 80,
    https_port: 443,
    https_configuration: {
        active: true,
        privkey_path: '/etc/letsencrypt/live/www.ardu-badge.com/privkey.pem',
        cert_path: '/etc/letsencrypt/live/www.ardu-badge.com/cert.pem',
        chain_path: '/etc/letsencrypt/live/www.ardu-badge.com/chain.pem',
        redirect_http: true
    },
    libraries_refresh_interval_in_seconds: 60,
    stats_refresh_interval_in_seconds: 10,
    mongodb_path: '127.0.0.1:27017',
    db_name: 'arduino-libs'
}
