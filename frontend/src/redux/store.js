import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from './cartSlice';
import checkoutReducer from "./checkoutSlice";
import orderReducer from "./orderSlice";
import adminReducer from "./adminSlice";
import adminProductReducer from "./adminProductSlice";
import adminOrderReducer from "./adminOrderSlice";

const store= configureStore({
    reducer:{
        auth:authReducer,
        products:productReducer,
        cart:cartReducer,
        checkout:checkoutReducer,
        orders:orderReducer,
        admin:adminReducer,
        adminProducts:adminProductReducer,
        adminOrders:adminOrderReducer
    },
});

export default store;