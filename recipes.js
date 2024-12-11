const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        ingredients: [
            {
                type: String,
                required: true,
            },
        ],
        steps: [
            {
                type: String,
                required: true,
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Link to the User model
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
