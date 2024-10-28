// Import the jsonwebtoken library to handle token verification
import jwt from "jsonwebtoken";

// Define an asynchronous middleware function that checks if a valid token is provided
const authMiddleware = async (req, res, next) => {
    
    // Extract the token from the request headers (assumed to be sent in the "Authorization" header)
    const { token } = req.headers;

    // Check if the token is missing in the request headers
    if (!token) {
        // If no token is found, return a JSON response indicating the user is not authorized
        return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    // Try block to handle token verification
    try {
        // Verify the token using the secret stored in the environment variable JWT_SECRET
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // If token is valid, add the decoded user ID from the token to the request body for future use
        req.body.userId = token_decode.id;

        // Call the next middleware or route handler in the chain, allowing the request to continue
        next();
    } catch (error) {
        // If there's an error (invalid token or other issues), log the error and respond with a failure message
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Export the authMiddleware function to be used in other parts of the app (e.g., to protect routes)
export default authMiddleware;
