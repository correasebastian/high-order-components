import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {   withProps } from "recompose";

const HomeLink = withProps(({ query }) => ({ href: '#/?query=' + query }))('a');
const ProductsLink = withProps({ href: '#/products' })('a');
const CheckoutLink = withProps({ href: '#/checkout' })('a');

const App = () =>
  <div className="App">
    <header>
      <HomeLink query="logo">Logo</HomeLink>
    </header>
    <nav>
      <HomeLink>Home</HomeLink>
      <ProductsLink>Products</ProductsLink>
      <CheckoutLink>Checkout</CheckoutLink>
    </nav>
  </div>;

export default App;
