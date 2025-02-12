import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    subCategory:{
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
     
    sizes: [
        {type: String}
    ],

    images: [{
        type: String
    }],

    bestSeller: {
        type: Boolean
    }

}, {
    timestamps: true
})


export const Product =  mongoose.model('Product', ProductSchema)

