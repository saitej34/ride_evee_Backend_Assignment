const jwt = require('jsonwebtoken');

function authenticateUser(req,res,next)
{
    const token = req.header('Authorization');
    //console.log(token)
    if (!token) 
    {
      return res.status(401).json({ status: 'Failed', message: 'Unauthorized - No token provided' });
    }
    try 
    {
      const decoded = jwt.verify(token,"ride");
      req.user = decoded.user; 
      next(); 
    } 
    catch (error) 
    {
      return res.status(401).json({ status: 'Failed', message: 'Unauthorized - Invalid token' });
    }
}

module.exports = authenticateUser;