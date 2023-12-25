const User = require('../database/User');

async function getUserById(req,res)
{
    const userId = req.params.id;
    try 
    {
        const user = await User.findById(userId);
        if (!user) 
        {
            return res.status(404).json({ "status": "Failed", "message": "User not found" });
        }
        return res.status(200).json({ "status": "Success", "user": user });
    } catch (error) 
    {
        return res.status(500).json({ "status": "Failed", "message": "Internal Server Error" });
    }
}

module.exports = getUserById;