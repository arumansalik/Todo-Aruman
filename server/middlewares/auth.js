const jwt = require("jsonwebtoken");
const JWT_SECRET = "ilovearuman";

function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch(err) {
        res.status(403).json({message : "Invalid token"});
    }
}

module.exports = {auth};