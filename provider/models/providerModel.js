const mongoose = require("mongoose");
const schema = mongoose.schema;

// Áp dụng identity field lên trường email của nhà cung cấp.
const providerSchema = new mongoose.Schema({
    _id: {type: String},
    name: String,
    phoneNumber: String,
    description: String,
  })

providerSchema.virtual('email').get(function(){
    return this._id;
})

const Provider = mongoose.model('Provider', providerSchema)
module.exports = Provider

// Provider.findOne(function(err, doc) {
//     console.log(doc.email);
// });