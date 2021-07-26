const User = require("../../schemas/UserSchema");
const Mailing = require("../../schemas/mailingValidationSchema");

const send_forget_password_email = async(req,res)=>{
    try {
        let {email,userName} = req.body;
        
        if(email===""&&userName==="") res.status(400).json("Email or user name should be provided");

        if(email===""){
            let user = await User.findOne({userName});
            if(!user) return res.status(404).json("User hasn't been registered in");
            email = user.email;
        }
        else{
            let user = await User.findOne({email});
            if(!user) return res.status(404).json("User hasn't been registered in");
        }
        
        if(user.status===0) res.status(400).json("User email hasn't been activated");

        await Mailing.deleteMany({email});

        const code = require('crypto').randomBytes(16).toString('hex');
        sendUserEmail(email,code);

        let newEmail = new Mailing({
            email,
            veri_code:code
        });
        console.log(newEmail);
        await newEmail.save();
       res.status(200).json("Success");

    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error");
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
        
            var html = "<div>http://127.0.0.1:5000/api/v1.0.0/user/reset_password/" + code + "/" + cnd + "</div>";
	        console.log(html);
	        var data = {
	        	from: 'habipetshelp@gmail.com', 
	        	to: cnd, 
	        	subject: 'Validation', 
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
}