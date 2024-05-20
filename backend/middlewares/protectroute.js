const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel");

async function protectRoute(req, res, next) {
    try {
        let token;

        // Check if Authorization header is present and has a Bearer token
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            // Extract token from Authorization header
            token = req.headers.authorization.split(" ")[1];
            console.log(token)

            // Verify the token
            const payload = jwt.verify(token, process.env.JWT_KEY);
            console.log(payload+"kjnjkjnjknkj")

            // If token is valid, find user by id
            if (payload) {
                const user = await userModel.findById(payload.id);
                req.id = user.id;
                req.user = user;
                next(); // Proceed to the next middleware
            } else {
                // Redirect to login page for browser requests
                const client = req.get('User-Agent');
                if (client.includes("Mozilla")) {
                    return res.redirect('/login');
                }
                // Send JSON response for non-browser requests
                return res.status(401).json({ msg: "Please login again" });
            }
        } else {
            // No Authorization header or Bearer token
            return res.status(401).send("Please login");
        }
    } catch (err) {
        // Handle errors
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = protectRoute;
