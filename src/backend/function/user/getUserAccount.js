const User = require("../../schemas/UserSchema")

module.exports = async(req,res) => {
    try {
        let user = await User.findById(req.user.id).select('-password');
        if(!user) return res.status(404).json("User not found");
        res.json(user);    
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
}