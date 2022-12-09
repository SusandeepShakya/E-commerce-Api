const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.verifyToken
    if (authHeader) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json("token not valid");
            } else {
                req.user = user;
            }
        })
    } else {
        return res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.statur(403).json("Not Allowed To update")
        }
    })
}

module.exports = { verifyToken, verifyTokenAuthorization };