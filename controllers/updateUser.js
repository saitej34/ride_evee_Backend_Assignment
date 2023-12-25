const User = require('../database/User')
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function updateUser(req, res) {
    const userId = req.params.id;
    const { name, email, phone, password, role } = req.body;

    try 
    {
        const user = await User.findById(userId);
        if (!user) 
        {
            return res.status(404).json({ "status": "Failed", "message": "User not found" });
        }
        if (req.user._id.toString() !== userId) 
        {
            return res.status(401).json({ "status": "Failed", "message": "Unauthorized" });
        }
        const updatedFields = 
        {
            name: name || user.name,
            email: email || user.email,
            phone: phone || user.phone,
            role: role || user.role,
        };
        if (password) 
        {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            updatedFields.password = hashedPassword;
        }
        const result = await User.findByIdAndUpdate(userId, { $set: updatedFields }, { new: true });
        console.log(result);
        return res.status(200).json({ "status": "Success", "message": "User updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "status": "Failed", "message": "Internal Server Error" });
    }
}

module.exports = updateUser;