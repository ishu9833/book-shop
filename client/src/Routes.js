import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import AdminRoute from "./auth/AdmiRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Cart from "./core/Cart";
import Home from "./core/Home";
import Product from "./core/Product";
import Shop from "./core/Shop";
import AdminDashboard from "./user/AdminDashboard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashboard from "./user/UserDashboard";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />

        <Route path="/signup" exact component={Signup} />

        <Route path="/signin" exact component={Signin} />

        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <Route path="/product/:producId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />

      
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
