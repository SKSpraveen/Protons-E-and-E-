const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    fname:String,
    service: String,
    feedback: String,
    selectedStarCount: Number
});

const faqSchema = new Schema({
    id: Number,
    faqquestion: String,
    faqanswer: String
});

const compSchema = new Schema({
    id: { type: Number, unique: true },
    uname: String,
    email: String,
    category: String,
    complaint: String,
   
});
const User = mongoose.model('User', userSchema);
const Faqs = mongoose.model('Faqs', faqSchema);
const Comp = mongoose.model('Comp', compSchema);

module.exports = {User,Faqs,Comp};