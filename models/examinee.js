const mongoose = require('mongoose');

const ExamineeSchema = mongoose.Schema({
    examineeName: {
        type: String,
        required: true
    },
    examineeAnswer : {
        type: Array,
        required: true
    },
    score :{
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Examinee', ExamineeSchema);