set -ex

docker build -t server .

docker run  -p 80:80 \
            -p 443:443 \
            -v ./cert.pem:/certs/ardu-badge.cert \
            -v ./privkey.pem:/certs/ardu-badge.key \
            server