
function validatePhoneNumber(phoneNumber) 
{
    const phoneRegex = /^[+]?[0-9]{1,4}[-\s.]?[0-9]{1,15}$/;
    return phoneRegex.test(phoneNumber);
}


module.exports = validatePhoneNumber;