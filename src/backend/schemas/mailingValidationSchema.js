const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MailingValidationSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    veri_code: {
      type: String,
      required: true
    },
    time:{
      type: Date,
      default: Date.now()
    }
});

  const mailingValidationSchema = mongoose.model("mailing validation", MailingValidationSchema);
  module.exports = mailingValidationSchema;