const mongoose =require('mongoose');
const validator = require('validator')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: [validator.isAlphanumeric, 'Title may only have letters and numbers.']
    },
    content: {
        type: String,
        required: true,
        validate: [(value) => {
            if (value.length > 100) {
                return false;
            }
            return true;
        },
            'Content is too Long'
        ]
    },
    Author: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports= mongoose.model('Post', PostSchema)