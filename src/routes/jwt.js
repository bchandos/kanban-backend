require('dotenv').config()
const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401); // if there isn't any token
    }
    try {
        const payload = await jwtVerify(token, process.env.TOKEN_SECRET);
        req.jwtPayload = payload;
        console.log(`User ID ${payload.userId} authenticated with JWT`);
        next(); // pass the execution off to whatever request the client intended
    } catch (err) {
        return res.status(403);
    }
}

const generateAccessToken = (userId) => {
    return jwt.sign({userId}, process.env.TOKEN_SECRET, { expiresIn: '12h' });
  }

const jwtVerify = (token, secret) => {
    // wrap jsonwebtoken verify() method in a Promise interface
    // so it can be used with async / await
    return new Promise( (resolve, reject) => {
        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                reject(err);
            }
            resolve(payload);
        });
    });
}

module.exports = {authenticateToken, generateAccessToken};