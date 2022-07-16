const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: Number
    },
    company: [{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }]
});

// El nombre "Data" es el nombre con el que accedo a este modelo. 
module.exports = mongoose.model("Data", dataSchema);