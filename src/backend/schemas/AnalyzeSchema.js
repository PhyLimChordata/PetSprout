const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnalyzeSchema = new Schema(
    {
      freq:[
        {
            date: Date,
            frequency: Number
        }
      ]
    }
)

const analyzeSchema = mongoose.model('analyze', AnalyzeSchema);
module.exports = analyzeSchema;