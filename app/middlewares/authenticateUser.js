const jwt= require('jsonwebtoken')

const authenticateUser = (req, res,next) => {
    const token = req.headers['authorization']
    if(!token) {
        return res.json(400).json({error:'token is required'}) //parse the JWT from incoming header token
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            id: tokenData.id,
            role: tokenData.role
        }
        //console.log(req.user)
        next()
    } catch (err) {
        return res.status(400).json({error:err})
    }
}

module.exports=authenticateUser