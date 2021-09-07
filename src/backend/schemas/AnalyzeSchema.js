const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyzeSchema = new Schema(
    {
      freq:[
        {
            date: Date,
            frequency: Number
        }
      ]
    }
)

const analyzeSchema = mongoose.model('analyze', analyzeSchema);
module.exports = analyzeSchema;