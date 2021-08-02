const User = require("../../schemas/UserSchema");
const Mailing = require("../../schemas/mailingValidationSchema");
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const bcryptjs = require('bcryptjs');
const { triggerAsyncId } = require("async_hooks");


const checkUserExist = async(req,res) => {
    try {
        let {email,userName} = req.body;
        console.log(email);
        console.log(userName);
        if (email === undefined) email = "";
        if (userName === undefined) userName = "";
        
        if(email===""&&userName==="") res.status(400).json("Email or user name should be provided");

        let user = null;
        if(email===""){
            user = await User.findOne({userName});
            if(!user) return res.status(404).json("User hasn't been registered in");
            email = user.email;
        }
        else{
            user = await User.findOne({email});
            if(!user) return res.status(404).json("User hasn't been registered in");
        }
        
        if(user.status===0) res.status(403).json("User email hasn't been activated");
        
        res.status(200).json({"email":email});
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
}

const pending_password = async(req,res) => {
    try {
        let {newPassword, email} = req.body;

        let user = await User.findOne({email});
        if(!user) return res.status(404).json("User not found");

        user.pending_password = newPassword;
        await user.save();
        
        await Mailing.deleteMany({email});

        const code = require('crypto').randomBytes(16).toString('hex');
        sendUserEmail(email,code);

        let newEmail = new Mailing({
            email,
            veri_code:code
        });
        console.log(newEmail);
        await newEmail.save();
        res.status(200).json("Email has been sent successfully");
        
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
}

const reset_password = async(req,res) => {
    try {
        let code = req.params.code;
        let email = req.params.email;
        
        let mail_vali = await Mailing.findOne({ email });
		if (!mail_vali)
			return res
				.status(200)
				.json('msg:' + 'No validation email was send before');
        
        const intervalTime = 1000 * 60 * 60;
        const endTime = new Date();
        if (endTime - mail_vali.time > intervalTime) {
            console.log('inside');
            await Mailing.deleteMany({ email });
            return res.status(200).json('msg:' + 'Code is expired');
        }
        
        if (code !== mail_vali.veri_code) 
            return res.status(200).json('msg:' + 'incorrect validation code');
                
        let user = await User.findOne({ email });
        if (!user) res.status(404).json("User doesn't exist");
        let newPassword = user.pending_password;

        const salt = await bcryptjs.genSalt(10);
		let hashedPassword = await bcryptjs.hash(newPassword, salt);
		user.password = hashedPassword;

        await user.save();
        await Mailing.deleteMany({ email });
        res.status(200).json("Success");             
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
}

const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/

function sendUserEmail(cnd,code){
    try{
        console.log("sendUserEmail start --> " + JSON.stringify(cnd));
        if(regEmail.test(cnd)){
            const transport = nodemailer.createTransport(smtpTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'habipetshelp@gmail.com',
                    pass: 'mvpiybwihptcqlgr'
                }
            }));
        
            var html = "<b>Click the link to allow resetting password and return back to app page</b>"+
            "<div>http://127.0.0.1:5000/api/v1.0.0/user/reset_password/" 
            + code + "/" + cnd + "/" + "</div>";
	        console.log(html);
	        var data = {
	        	from: 'habipetshelp@gmail.com', 
	        	to: cnd, 
	        	subject: 'Password Reset', 
	        	html: html
	        };    
            console.log(data);
            transport.sendMail(data);
        }
        else{
            assert(false,422,'Please enter correct email syntax');
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json("Server error");
    }
};


exports.checkUserExistl = checkUserExist;
exports.pending_password = pending_password;
exports.reset_password = reset_password;