const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MailingValidationSchema = new Schema({
    email: {
      type: String
    },
    veri_code: {
      type: String
    }
});

  const mailingValidationSchema = mongoose.model("user", MailingValidationSchema);
  module.exports = mailingValidationSchema;