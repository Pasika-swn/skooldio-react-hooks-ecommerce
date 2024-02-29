import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import { ColorRing } from 'react-loader-spinner';
import styled from 'styled-components';
import useAPI from '../hooks/useAPI'

// import { products } from '../data';
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Home = () => {
  const {data, loading} = useAPI("/products")

  
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
      {!loading && data && <ProductList data={data} />}
    </div>
  );
};

export default Home;
