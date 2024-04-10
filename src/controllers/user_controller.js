const UserModel = require('./../models/user_model');
const bcrypt = require('bcrypt');

const UserController = {

    createAccount: async function(req, res) {
        try {
            const userData = req.body;
            const newUser = new UserModel(userData);
            await newUser.save();

            return res.json({ success: true, data: newUser, message: "User created!" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    signIn: async function(req, res) {
        try {
            const { email, password } = req.body;

            const foundUser = await UserModel.findOne({ email: email });
            if(!foundUser) {
                return res.json({ success: false, message: "User not found!" });
            }

            const passwordsMatch = bcrypt.compareSync(password, foundUser.password);
            if(!passwordsMatch) {
                return res.json({ success: false, message: "Incorrect password!" });
            }

            return res.json({ success: true, data: foundUser });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
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

            if(!updatedUser) {
                throw "user not found!";
            }

            return res.json({ success: true, data: updatedUser, message: "User updated!" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    changePassword: async function(req, res) {
        try {
            const userId = req.params.id;
            const updateData = req.body;
    
            // Hash the password field if it's present in the updateData
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            }
    
            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: userId },
                updateData,
                { new: true }
            );
    
            if (!updatedUser) {
                throw "User not found!";
            }
    
            return res.json({ success: true, data: updatedUser, message: "User updated!" });
        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },

    // changePassword: async function(req, res) {
    //     try {
    //         const userId = req.params.id;
    //         const { oldPassword, newPassword } = req.body;
    
    //         const foundUser = await UserModel.findById(userId);
    //         if (!foundUser) {
    //             return res.status(404).json({ success: false, message: "User not found!" });
    //         }
    
    //         const passwordsMatch = await bcrypt.compare(oldPassword, foundUser.password);
    //         if (!passwordsMatch) {
    //             return res.status(401).json({ success: false, message: "Incorrect old password!" });
    //         }
    
    //         foundUser.password = newPassword;
    //         await foundUser.save();
    
    //         return res.json({ success: true, message: "Password changed successfully!" });
    //     } catch (error) {
    //         return res.status(500).json({ success: false, message: error.message });
    //     }
    // },
    

    fetchAllUsers: async function(req, res) {
        try {
            const users = await UserModel.find().sort({ name: 1 });
            return res.json({ success: true, data: users });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    removeUser: async function(req, res) {
        try {
            const userId = req.params.id;
            const removedUser = await UserModel.findByIdAndDelete(userId);
            if (!removedUser) {
                return res.json({ success: false, message: "User not found!" });
            }
            return res.json({ success: true, data: removedUser, message: "User removed!" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    }
    

};

module.exports = UserController;