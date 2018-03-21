var jwt = require('jsonwebtoken');

module.exports = tokenAuthorize = async (req, res, next) => {
   try {
     const token = await req.get('Authorization');
    const decoded = await authorize(token);
    req.user = decoded;
    next();
   }
   catch(err) {
       err.status = 401;
       next(err);
   }
}

authorize = async (token) => {
    try {
        return await jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        throw err;
    }
}