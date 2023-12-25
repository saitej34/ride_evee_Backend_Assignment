const User = require('../database/User')

async function deleteUser(req,res)  /// can be done by admin
{
    const userId = req.params.id;
    try 
    {
        const user = await User.findById(userId);
        if (!user) 
        {
            return res.status(404).json({ "status": "Failed", "message": "User not found" });
        }
        if(req.user.role === "user")
        {
            return res.status(401).json({"status":"Failed","message":"Unauthorized"});
        }
        const result = await User.findByIdAndDelete(userId);
        return res.status(200).json({ "status": "Success", "message": "User deleted successfully" });
    } catch (error) 
    {
        console.log(error)
        return res.status(500).json({ "status": "Failed", "message": "Internal Server Error" });
    }
}

module.exports = deleteUser;