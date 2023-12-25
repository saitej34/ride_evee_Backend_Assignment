const validateEmail = require('../reusable_function/validateEmail')
const validatePhoneNumber = require('../reusable_function/validatePhoneNumber')
const User = require('../database/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')


async function addUser(req,res){
    let saltRounds = 10;
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) 
    {
        return res.status(400).json({"status": "Failed", "message": "Attributes are Missing"});
    }
    if (!validateEmail(email)) 
    {
        return res.status(400).json({"status": "Failed", "message": "Email Validation Failed"});
    }
    if (!validatePhoneNumber(phone)) 
    {
        return res.status(400).json({"status": "Failed", "message": "Phone Number Validation Failed"});
    }
    const check = await User.findOne({ email: email });
    if (check) 
    {
        return res.status(409).json({"status": "Failed", "message": "Email already registered"});
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const udata = {
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword,
        role: role
    };
    const payload = {
        user:udata
      };
      
    const user = User(udata);
    const token = jwt.sign(payload,"ride",{ expiresIn: '1h' }); 
    try 
    {
        await user.save();
        return res.status(200).json({"status": "Success", "message": "Registration successful","token":token});
    } catch (error) 
    {
        console.log(error)
        return res.status(500).json({"status": "Failed", "message": "Internal Server Error"});
    }
}

module.exports = addUser;