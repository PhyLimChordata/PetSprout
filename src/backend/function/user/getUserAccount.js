const User = require("../../schemas/UserSchema")

const viewAccount = async(req,res) => {
    try {
        console.log(req.user.id);
        let user = await User.findById(req.user.id).select('-password');
        if(!user) return res.status(404).json("User not found");
        res.json(user);    
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
}

const modifyAccount = async(req,res) =>{
    try {
        let user = await User.findById(req.user.id).select('-password');
        if(!user) return res.status(404).json("User not found");
        let {about} = req.body;
        user.about = about;
        await user.save();
        res.json(user);  
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
}

exports.viewAccount = viewAccount;
exports.modifyAccount = modifyAccount;
