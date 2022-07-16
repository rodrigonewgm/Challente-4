const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companiesSchema1 = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

// El nombre "Data" es el nombre con el que accedo a este modelo. 
module.exports = mongoose.model("Companies", companiesSchema1);