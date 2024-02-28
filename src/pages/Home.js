import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';

// import { products } from '../data';

export const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://us-central1-skooldio-react-hooks.cloudfunctions.net/products')
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("data",data);
        setProducts(data)
        setLoading(false)
      });
  }, []);

  // if(loading) {
  //   return <span style={{fontSize:}}>Loading...</span>
  // }

  return (
    <div>
      <Hero />
      {
        loading && <div style={{fontSize:"100px"}}>Loading</div>
      }
      {
        !loading && <ProductList data={products} />
      }
      
    </div>
  );
};

export default Home;
