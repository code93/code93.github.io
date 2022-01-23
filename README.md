# The site is live on https://code93.github.io

## To locally test it 

### create cert.pem and key.pem in the same directory
```bash
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```

### run the following command
```bash
node server.js
```

### go to the link https://localhost:8080/index.html

