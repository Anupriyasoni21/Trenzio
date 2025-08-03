const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDb=require("./config/db");

const userRoutes=require("./routes/userRoute");
const productRoutes =require("./routes/ProductRoute");
const cartRoutes =require("./routes/cartRoute");
const checkoutRoutes=require("./routes/checkoutRoute");
const orderRoutes=require("./routes/orderRoute");
const uploadRoutes=require("./routes/uploadRoute");
const subscriberRoutes=require("./routes/subscriberRoute");
const adminRoutes=require("./routes/adminRoute");
const productAdminRotes=require("./routes/productAdminRoute");
const adminOrderRoutes=require("./routes/adminOrderRoute");


dotenv.config();

const app=express();
app.use(express.json());

app.use(cors());


const PORT=process.env.PORT || 3000;

//connect db 
connectDb();

app.get("/",(req,res)=>{
    res.send("welcome");
});

//api route
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",checkoutRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api",subscriberRoutes);

//Admin routes
app.use("/api/admin/users",adminRoutes);
app.use("/api/admin/products",productAdminRotes);
app.use("/api/admin/orders",adminOrderRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});