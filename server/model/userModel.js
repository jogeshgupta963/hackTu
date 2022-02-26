const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    avatar: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
})
// userSchema.pre("save", async () => {
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     this.password = hashedString;
// })


const userModel = mongoose.model('userModel', userSchema)
module.exports = userModel