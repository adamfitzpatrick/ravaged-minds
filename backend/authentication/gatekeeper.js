const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

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
