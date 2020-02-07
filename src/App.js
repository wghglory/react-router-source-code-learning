import React from 'react';
import './styles.css';

import { BrowserRouter, Route, Link } from '../my-react-router-dom';

import Home from './Home';
import User from './User';
import Product from './Product';
import Fruit from './Fruit';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/user">User</Link>
          <Link to="/fruit">Fruit</Link>
          <Link to="/product">Product</Link>
        </nav>
        <Route exact path="/" component={Home} />
        {/* <Route path="/user" children={() => <User />} /> */}
        <Route path="/user" children={<User />} />
        <Route path="/fruit">
          <Fruit />
        </Route>
        <Route path="/product" render={() => <Product />} />
      </BrowserRouter>
    </div>
  );
}
