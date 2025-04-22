import jwt from "jsonwebtoken";

import dotenv from "dotenv";


// Load environment variables from .env file
dotenv.config();



const authenticateToken = (req, res, next) => {
        const authHeader = req.get("authorization");
      
        if (!authHeader) {
          res.json({
            success: false,
            message: "access denied! unauthorised user",
          });
        } else {
          const token = authHeader.split(" ")[1];
      
          // Split the header value to separate "Bearer" and the token
      
          jwt.verify(token, process.env.SECRET_KEY_FOR_TOKEN, (err, userInfo) => {
            if (err) {
            return  res.json({
                success:false,
                message: "invalid token",
              });
            }
            //   req.user = userInfo;
            next();
          });
        }
      };
      
      export default authenticateToken;