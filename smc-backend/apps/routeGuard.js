var { expressjwt: jwt } = require("express-jwt");

require("dotenv").config();

exports.routeGuard =jwt({
    // if the token is valid express jwt appends the varified user id
    // in an auth key to the request object
        secret:process.env.JWT_SECRET,
        algorithms: ['sha1', 'RS256', 'HS256'],
        userProperty:"auth"
    })