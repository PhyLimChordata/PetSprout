const Report = require("../../schemas/ReportMessageSchema");
const User = require("../../schemas/UserSchema");
const {validationResult} = require("express-validator");


const sendBugReport = async (req,res) => {
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        
        let {message} = req.body;

        let user = await User.findById(req.user.id).select('-password');
        
        if(!user)
            return res.status(404).json("User not found");
        
        let user_email = user.email;

        let newReport = new Report({
            user_email,
            message,
            report_type: "BUG"
        });

        await newReport.save();
        res.status(200).json("Success");
    } catch (error) {
        console.error(error);
        return res.status(500).json("server error");
    }
}

const sendFeedbackReport = async (req,res) => {
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        
        let {message} = req.body;

        let user = await User.findById(req.user.id).select('-password');
        
        if(!user)
            return res.status(404).json("User not found");
        
        let user_email = user.email;

        let newReport = new Report({
            user_email,
            message,
            report_type: "FEEDBACK"
        });

        await newReport.save();
        res.status(200).json("Success");
    } catch (error) {
        console.error(error);
        return res.status(500).json("server error");
    }
}

exports.sendBugReport = sendBugReport;
exports.sendFeedbackReport = sendFeedbackReport;
