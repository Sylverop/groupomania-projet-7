const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {   
        authorName: { type: String, required: true },
        date: { type: Date },
        message: { type: String, trim: true, maxlength: 500},
        image: { type: String },        
        likers: { type: [String], required: true },       
        comments: [{
            authorName: { type: String, required: true },
            text: { type: String, trim: true, maxlength: 500 },
            creationDate: { type: Date },
        }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Post', PostSchema);