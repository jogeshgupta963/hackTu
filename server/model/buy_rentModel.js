const mongoose = require('mongoose')

const buy_sellSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    item: {
        type:
    }

})