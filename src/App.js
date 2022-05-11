import * as React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import './App.css';
import './Sidebar.css';
import './components/Api.css';

import Sidebar from './components/Sidebar';
import NotFound from './components/NotFound';
import Api from './components/Api';
import Product from './components/Product';
import Productos from './components/Productos';
import User from "./components/User";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route index element={<><Api /> <Productos /></>} />
        <Route path="user/:id" element={<User />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
