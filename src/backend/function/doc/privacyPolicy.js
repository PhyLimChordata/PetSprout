const DocumentSchema = require('../../schemas/documentSchema');

/* '/doc/acceptPolicy'
    Params: {id: __user_id__}
*/
const acceptPolicy = async (req, res) => {
    try {
        // Check if there exists a document for that user already.
        // TODO: In the future check if there exists an (User, Document Version) entry.
        userId = req.id;
        let doc = await DocumentSchema.findOne({id: userId});
        if(!doc) {
            let newAccept = new DocumentSchema({
                user_id: userId,
                did_accept_policy: true,
            })

            await newAccept.save();
        } else {
            doc.did_accept_policy = true;
            await doc.save();
        }
        res.status(200).json("Privacy Policy accepted.")
    
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error when handling /acceptPolicy");
    }
}

exports.acceptPolicy = acceptPolicy;