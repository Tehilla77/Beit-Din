const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.jwt;

        // If no token is provided, return 401 (Unauthorized)
        if (!token) {
            return res.status(401).json({ error: "Token not found. Please log in." });
        }

        // Verify token using the secret key
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                // Token is invalid or expired, return 403 (Forbidden)
                return res.status(403).json({ error: "Invalid or expired token." });
            }

            // Attach user information from the token to the request object
            req.user = decoded.userId;
            console.log("everything o.k")
            // Proceed to the next middleware or route handler
            next();
        });
    } catch (err) {
        // Handle any other errors that may occur
        console.error('Error verifying JWT:', err);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

module.exports = verifyJWT;
