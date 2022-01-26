const DocumentSchema = require('../../schemas/documentSchema');

/* '/doc/acceptTerms'
    Params: {id: __user_id__}
*/
const acceptTerms = async (req, res) => {
    try {
        // Check if there exists a document for that user already.
        // TODO: In the future check if there exists an (User, Document Version) entry.
        userId = req.id;
        let doc = await DocumentSchema.findOne({id: userId});
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
        res.status(200).json("Terms and Conditions accepted.")
    
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error when handling /acceptTerms");
    }
}

exports.acceptTerms = acceptTerms;