const User = require('../database/User')
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function updateUser(req,res)
{
    //console.log(req.user);
    //console.log(req.body);
    const userId = req.params.id;
    const { name, email, phone, password, role } = req.body;
    try 
    {
        const user = await User.findById(userId);
        if (!user) 
        {
            return res.status(404).json({ "status": "Failed", "message": "User not found" });
        }
        if(user.email != req.user.email)
        {
            return res.status(401).json({"status":"Success","message":"Unauthorized"});
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        if (password) 
        {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            user.password = hashedPassword;
        }
        user.role = role || user.role;

        await user.save();
        return res.status(200).json({ "status": "Success", "message": "User updated successfully" });
    } catch (error) 
    {
        console.log(error)
        return res.status(500).json({ "status": "Failed", "message": "Internal Server Error" });
    }
}

module.exports = updateUser;