import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        index: true,
        trim: true,
        unique: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"]
    }

}, { 
    timestamps: true 
})


UserSchema.pre('save', async function (next) {
    
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    next()

})

UserSchema.methods.isPasswordCorrect = async function (password) {
    const result = await bcrypt.compare(password, this.password)

    return result

}

UserSchema.methods.generateAccessToken = function () {

    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    
}

UserSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    
}

export const User =  mongoose.model('User', UserSchema)

