const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const taskModel = require("./taskmodel");

(async function () {
    try {
        const connection = await mongoose.connect(
            "mongodb+srv://nikhil21fbd:r3sA3sMmv8uarZql@cluster0.oveeltq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log("Connected to MongoDB:", connection.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the name"]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Please enter an email"],
            validate: {
                validator: function (value) {
                    return emailValidator.validate(value);
                },
                message: "Please enter a valid email address"
            }
        },
        Password: {
            type: String,
            required: [true, "Please enter a password"]
        },

        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "taskModel"
        }],
        token: String
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('Password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.Password, salt);
            this.Password = hash;
        } catch (err) {
            return next(err);
        }
    }
    next();
});


const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
