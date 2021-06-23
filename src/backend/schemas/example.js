const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exampleSchema = new Schema({
    content: {
      type: String,
      unique: true,
      required: true
    },
    extra: {
      type: String,
      default: "",
      required: false
    }
  }, {
    timestamps: true 
});

  const example = mongoose.model('example', exampleSchema);
  module.exports = example;