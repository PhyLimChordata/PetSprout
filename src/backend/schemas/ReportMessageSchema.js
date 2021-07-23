const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportMessageSchema = new Schema({
    user_email: {
      type: String,
      required: true
    },
    message: {
        type: String,
        require: true
    },
    report_type: {
      type: String
    }
  }, {
    timestamps: true 
});

  const reportMessageSchema = mongoose.model("report", ReportMessageSchema);
  module.exports = reportMessageSchema;