const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
// const mysql = require('mysql')
// require('./model/sequelize')

// // mysqldirect
// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "jumper"
//   });

mongoose.connect("mongodb+srv://SandipDon:Sandipdon1@cluster1.ny5gxay.mongodb.net/Sandip?retryWrites=true&w=majority&appName=Cluster1");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

// // mysqldirect
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });


// Routes of mongoose
const UserRoutes = require('./routes/user_routes');
app.use("/api/user", UserRoutes);

const ProductRoutes = require('./routes/product_routes');
app.use("/api/product", ProductRoutes);

const OrderRoutes = require('./routes/order_routes');
app.use("/api/order", OrderRoutes);

const CategoryRoutes = require('./routes/category_routes');
app.use("/api/category", CategoryRoutes);

const CartRoutes = require('./routes/cart_routes');
app.use("/api/cart", CartRoutes);



const PORT = 5000;
app.listen(PORT, () => console.log('Server started at PORT: 5000'));

app.get("/", async (req, res) => {
    res.json("Hello World")
})

// function addUser(email, password) {
//     return new Promise((resolve, reject) => {
//         const query = "INSERT INTO users (email, PASSWORD) VALUES (?, ?)";
//         con.query(query, [email, password], (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// }

// app.post("/addUser", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         await addUser(email, password);
//         res.status(200).json({ success: true, message: "User added successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// })

// function addProduct(name, price, description) {
//     return new Promise((resolve, reject) => {
//         const query = "INSERT INTO products(name, price, description) VALUES (?, ?, ?)";
//         con.query(query, [name, price, description], (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// }

// app.post("/addProduct", async (req, res) => {
//     const { name, price, description } = req.body;
//     try {
//         await addProduct(name, price, description);
//         res.status(200).json({ success: true, message: "Product added successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
