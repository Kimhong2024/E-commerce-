import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar_menu from './components/Sidebar_menu';
import Home from './pages/Home';
import Product from './pages/Product';
import Order from './pages/Order';
import Customer from './pages/Customer';
import Report from './pages/Report';
import Invoice from './pages/Invoice';
import Setting from './pages/Setting';
import Optional from './pages/Optional';

function App() {
  
  return (
    <div>
      <Header/>
      <BrowserRouter>
      <Sidebar_menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/invoices" element={<Invoice />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/optional" element={<Optional />} />
          {/* Add more routes as needed */}

        
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
