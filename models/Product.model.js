const { Schema, model } = require("mongoose");
const { default: mongoose } = require("mongoose");

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        minAge: Number,
        maxAge: Number,
        description: String,
        images: [String],
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        category: {
            type: [String],
            enum: ["dolls", "lego", "videoGames", "baby", "puzzles", "other"]
        }
    },
    {
        timestamps: true,
    }
)

const Product = model("Product", productSchema);
module.exports = Product;