const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
// const secretKey = 'theredcatisblue';
const iv = crypto.randomBytes(16);

const encrypt = (text, secretKey) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash, secretKey) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return JSON.parse(decrpyted.toString());
};

module.exports = {
    encrypt,
    decrypt
};