const mongoose = require('mongoose')
const validator = require('validator')

const getID = function (min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


const quoteSchema = new mongoose.Schema({
        quoteID: {
            type: String,
            required: true,
            default: getID(100000,120000)
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        postcode: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (!validator.isPostalCode(value, 'BR')) {
                    throw new Error('Postcode is invalid')
                }
            }
        },
        dob: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        advance: {
            type: Number,
            required: true
        },
        term: {
            type: Number,
            required: true
        },
        rate: {
            type: Number,
            required: true
        },
        apr: {
            type: Number
        },
        payment: {
            type: Number
        },
        status: {
            type: String,
            required: true,
            trim: true
        },
        tier: {
            type: String,

        }
}, {
    timestamps: true
})

quoteSchema.statics.findByCredentials = async (quoteID) => {
    const quote = await Quote.findOne({ quoteID })

    if (!quote) {
        throw new Error('Unable to login')
    }

    return quote
}

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote