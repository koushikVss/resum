const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    _id: {
        type: String
    },
    title: {
        type: String
    },
    email: {
        type: String
        // required:true
    },
    basic: {
        type: Object
        // required:true

    },
    educations: {
        type: Array
        // required:true

    },
    projects: {
        type: Array
        // required:true

    },
    experiences: {
        type: Array
        // required:true

    },
    skills: {
        type: String
        // required:true

    },
    certificates: {
        type: Array
        // required:true

    },
    achievements: {
        type: Array
        // required:true
    },

    languages: {
        type: Array
        // required:true
    },
    hobbies: {
        type: String
        // required:true
    }

});

module.exports = mongoose.model('Usermodel', UserSchema, 'User');