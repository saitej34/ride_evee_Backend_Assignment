const User = require('../database/User');

async function getUsers(req,res)
{
    try 
    {
        const users = await User.find();
        return res.status(200).json({ "status": "Success", "users": users });
    } 
    catch (error) 
    {
        return res.status(500).json({ "status": "Failed", "message": "Internal Server Error" });
    }
}

module.exports = getUsers;