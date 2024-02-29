import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import { ColorRing } from 'react-loader-spinner';
import styled from 'styled-components';

// import { products } from '../data';
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://us-central1-skooldio-react-hooks.cloudfunctions.net/products')
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("data",data);
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // if(loading) {
  //   return <span style={{fontSize:}}>Loading...</span>
  // }

  return (
    <div>
      <Hero />
      {loading && (
        <LoadingContainer>
          <ColorRing
            visible={true}
            height="180"
            width="180"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </LoadingContainer>
      )}
      {!loading && <ProductList data={products} />}
    </div>
  );
};

export default Home;
