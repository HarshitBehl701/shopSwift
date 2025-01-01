const jwt = require('jsonwebtoken');

const isLoggedIn  = async (req,res,next) =>{
    const authorization = req.headers['authorization'];
    const userType =  req.headers['x-user-type'];
    if(!authorization) return res.status(403).send({message:   "Token  is missing"});
    try{
        const token  = authorization.split('Bearer ')[1]?.trim();

        if(!token) return  res.status(403).send({message: "Token is missing"});

        const verifyToken  = await jwt.verify(token,process.env.SECRET);

        req.user = verifyToken;
        req.userType = userType;
        
        next();
    
    }catch(err){
        return res.status(500).send({message:  "Internal  Server  Error " + err.message});
    }
}

module.exports = isLoggedIn;