require('dotenv').config()
const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.status(401);
        return res.json({
            status: 'Unauthorized',
            message: 'JSON Web Token not found'
        })
    }
    try {
        const payload = await jwtVerify(token, process.env.TOKEN_SECRET);
        req.jwtPayload = payload;
        console.log(`User ID ${payload.userId} authenticated with JWT, expires ${new Date(payload.exp*1000)}`);
        next(); // pass the execution off to whatever request the client intended
    } catch (err) {
        return res.sendStatus(403);
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