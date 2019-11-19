const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
    q: {
        type: String,
        required: true
    },
    a : {
        type: Array,
        required: true
    },
    ca :{
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Quiz', QuizSchema);