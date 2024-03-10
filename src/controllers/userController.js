const { addUser } = require("./../models/userModel");


const userController = {
createUser: async function createUser(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    await addUser(email, password);
    res.status(200).json({ success: true, message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
}

// const userController = {

//     createUser: async function (req, res) {
//         try {
//             const userData = req.body;
//             const newUser = new UserModel(userData);
//             await newUser.save();

//             return res.json({ success: true, data: newUser, message: "User Created!" });
//         }
//         catch(ex) {
//             return res.json ({ success: false, message: ex });
//         }
//     },
module.exports = userController;
