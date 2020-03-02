const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://breakfastduck:halflife@cluster0-0tx7t.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

