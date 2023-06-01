import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import FootImages from "./components/FootImages";
import CarouselImages from "./components/CarouselImages";
import Navibar from "./components/Navibar";
import Home from "./components/Home";
import Products from "./components/Products";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Signup from "./components/Signup";
import Admin from "./components/Admin";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Navibar />
        <Routes>
          <Route path="/about" element={<About />}></Route>
          <Route path="/footimages" element={<FootImages />}></Route>
          <Route path="/CarouselImages" element={<CarouselImages />}></Route>
          <Route path="/navibar" element={<Navibar />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
