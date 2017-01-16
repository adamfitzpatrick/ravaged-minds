const jwt = require("jsonwebtoken");
const secret = require("./jwt-secret.json").secret;

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        return jwt.verify(token, secret, (err) => {
            if (!err) { return next(); }
            return res.status(401).end();
        });
    }
    return res.status(401).end();
};
