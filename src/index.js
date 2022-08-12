import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Blog from './Blog'
import BlogDetail from './Detail/BlogDetail';
import LoginForm from './Member/LoginForm';
import Home from './Home';
import PageNotFound from './404';
import Account from './Account/Account';
import AddProduct from './Account/AddProduct';
import MyProduct from './Account/MyProduct';
import EditProduct from './Account/EditProduct';
import ProductDetail from './Product/ProductDetail';
import Cart from './Product/Cart';
import WishList from './Product/WishList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/detail/:id' element={<ProductDetail />} />
          <Route path='/product/cart' element={<Cart />} />
          <Route path='/product/wishlist' element={<WishList />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/detail/:id' element={<BlogDetail />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/account' element={<Account />} />
          <Route path='/account/addproduct' element={<AddProduct />} />
          <Route path='/account/myproduct' element={<MyProduct />} />
          <Route path='/account/user/product/:id' element={<EditProduct />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);