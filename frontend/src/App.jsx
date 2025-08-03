import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
import Home from "./pages/Home";
import {Toaster} from "sonner";
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPages from './pages/CollectionPages';
import ProductDetails from './components/Products/ProductDetails';
import CheckOut from './components/Cart/CheckOut';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderDetailsPage from './pages/orderDetailsPage';
import MyOrderPage from './pages/MyOrderPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/Admin/UserManagement';
import ProductManagement from './components/Admin/ProductManagement';
import EditProductPage from './components/Admin/EditProductPage';
import OrderManagemet from './components/Admin/OrderManagemet';
import ProtectedRoute from './components/Common/ProtectRoute';

import {Provider} from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
  <BrowserRouter >
  <Toaster position="top-right"/>
   <Routes>
    <Route path="/" element={<UserLayout/>}>
     <Route index element={<Home/>}/>
     <Route path='login' element={<Login/>}/>
     <Route path='register' element={<Register/>}/>
     <Route path='profile' element={<Profile/>}/>
     <Route path='collections/:collection' element={<CollectionPages/>}/>
     <Route path='product/:id' element={<ProductDetails/>}/>
     <Route path='checkout' element={<CheckOut/>}/>
     <Route path='order-confirmation' element={<OrderConfirmation/>}/>
     <Route path='order/:id' element={<OrderDetailsPage/>}/>
     <Route path='my-orders' element={<MyOrderPage/>}/>
    </Route>
    <Route path='/admin' element={<AdminLayout/>}>
    <Route index element={<ProtectedRoute role="admin"><AdminHomePage/></ProtectedRoute>}/>
    <Route path='users' element={<UserManagement/>}/>
     <Route path='products' element={<ProductManagement/>}/>
     <Route path='products/:id/edit' element={<EditProductPage/>}/>
     <Route path='orders' element={<OrderManagemet/>}/>
    </Route>
   </Routes>
   </BrowserRouter>
   </Provider> 
  )
}

export default App

