const jwt = require('jsonwebtoken')
const JWT_KEY = "RealEstateInvestments";

const fetchuser = (req,res,next)=>{

    const Token = req.header('auth-token')
    if(!Token)
    {
        res.status(401).send({error:"Please authenticate token"})
    }

    try {
        const data = jwt.verify(Token,JWT_KEY)
        req.user=data.user;
        
        next();
        
    } catch (error) {
        res.status(401).send({error:"Please authenticate token"})
    }
}

module.exports = fetchuser;