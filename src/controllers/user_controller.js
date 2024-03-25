const UserModel = require('./../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = {
    createAccount: async function(req, res) {
        try {
            const userData = req.body;
            const newUser = new UserModel(userData);
            await newUser.save();

            return res.json({ success: true, data: newUser, message: "User Created!" });
        } catch (ex) {
            return res.status(500).json({ success: false, message: ex.message });
        }
    },

    signIn: async function(req, res) {
        try {
            const { email, password } = req.body;

            const foundUser = await UserModel.findOne({ email: email });
            if (!foundUser) {
                return res.status(404).json({ success: false, message: "User not found!" });
            }

            const passwordsMatch = bcrypt.compareSync(password, foundUser.password);
            if (!passwordsMatch) {
                return res.status(401).json({ success: false, message: "Incorrect Password!" });
            }

            // Generate JWT token
            const token = jwt.sign({ email: foundUser.email, isadmin: foundUser.isadmin }, 'ijhfdrestryyuoiyduert7uih', { expiresIn: '1h' });

            return res.json({ success: true, token: token, data: foundUser });
        } catch (ex) {
            return res.status(500).json({ success: false, message: ex.message });
        }
    },

    updateUser: async function(req, res) {
        try {
            const userId = req.params.id;
            const updateData = req.body;

            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: userId },
                updateData,
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            return res.json({ success: true, data: updatedUser, message: "User updated successfully." });
        } catch (ex) {
            return res.status(500).json({ success: false, message: ex.message });
        }
    },

    // signOut: async function(req, res) {
    //     try {
    //         // Perform any additional clean-up or logging tasks here
    //         // For example, clear any related tokens or cookies

    //         return res.json({ success: true, message: "User signed out successfully." });
    //     } catch (ex) {
    //         return res.status(500).json({ success: false, message: ex.message });
    //     }
    // }
};

module.exports = UserController;
