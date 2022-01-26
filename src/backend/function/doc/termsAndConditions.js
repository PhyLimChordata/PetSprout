const DocumentSchema = require('../../schemas/documentSchema');

const acceptTerms = async (req, res) => {
    try {
        // Check if there exists a document for that user already.
        // TODO: In the future check if there exists an (User, Document Version) entry.
        userId = req.user.id;
        let doc = await DocumentSchema.findOne({user_id: userId});
        if(!doc) {
            let newAccept = new DocumentSchema({
                user_id: userId,
                did_accept_terms: true,
            })

            await newAccept.save();
        } else {
            doc.did_accept_terms = true;
            await doc.save();
        }
        res.status(200).json("Terms and Conditions accepted.");
    
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error when handling /acceptTerms");
    }
}

const didAcceptTerms = async (req, res) => {
    try {
        // Check if there exists a document for that user already.
        // TODO: In the future check if there exists an (User, Document Version) entry.
        userId = req.user.id;
        console.log(userId)
        let doc = await DocumentSchema.findOne({user_id: userId});
        console.log(doc)
        if(!doc) {
            res.status(200).send(false);
           
        } else {
            console.log(doc.did_accept_terms)
            if(doc.did_accept_terms) {
                res.status(200).send(true);
            } else {
                res.status(200).send(false);
            }
        }
    
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error when handling /didAcceptPolicy");
    }
}

exports.acceptTerms = acceptTerms;
exports.didAcceptTerms = didAcceptTerms;