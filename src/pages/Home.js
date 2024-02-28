import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';

import { products } from '../data';

export const Home = () => {

  useEffect(() => {
    fetch('https://us-central1-skooldio-react-hooks.cloudfunctions.net/products')
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data",data);
      });
  }, []);

  return (
    <div>
      <Hero />
      <ProductList data={products} />
    </div>
  );
};

export default Home;
