const JWT_SECRET = "secret";
// const jwt = require("jsonwebtoken");

// module.exports = async (request, response, next) => {
//   try {
//     console.log(1);
//     //   get the token from the authorization header
//     // const token = await request.headers.authorization.split(" ")[1];
//     const token = request.headers.Authorization.split(" ")[1];

//     console.log(2);
//     console.log(token);

//     //check if the token matches the supposed origin
//     const decodedToken = await jwt.verify(token, JWT_SECRET);
//     console.log(3);

//     // retrieve the user details of the logged in user
//     const user = await decodedToken;
//     console.log(4);

//     // pass the user down to the endpoints here
//     request.user = user;
//     console.log(5);

//     // pass down functionality to the endpoint
//     next();
    
//   } catch (error) {
//     response.status(401).json({
//       error: new Error("Invalid request!"),
//     });
//   }
// };

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).json({ msg: "Missing auth header" });
    }
// console.log(authHeader);
    try {
        const token = authHeader.split(" ")[1];
// console.log(token);
        
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log(decoded.id);

        if (decoded && decoded.id) {
            req.id = decoded.id;
        // console.log("valid token");
        // console.log(req.id);

            next();
        } else {
            return res.status(403).json({ msg: "Invalid token 1" });
        }
    } catch (error) {
        return res.status(403).json({ msg: "Invalid token" });
    }
};

module.exports = auth;
