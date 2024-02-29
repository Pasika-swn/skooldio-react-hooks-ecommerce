import styled from 'styled-components';

import BaseContainer from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';

import { numberWithCommas } from '../utils';
// import { products } from '../data';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import useAPI from '../hooks/useAPI';
import useCart from '../hooks/useCart'; 

const Container = styled(BaseContainer)`
  padding-top: 78px;
  padding-bottom: 78px;
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 96px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 40px;
  line-height: 60px;
  font-weight: 600;
  margin-bottom: 72px;
`;

const Subtitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  line-height: 48px;
  font-weight: 400;
  color: #000000;
`;

const Description = styled.p`
  font-size: 24px;
  line-height: 36px;
  font-weight: 300;

  color: #000000;
  margin-top: 0;
  margin-bottom: 72px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

// const data = products[0];

/**
 * Below is the main ProductDetail component.
 */
export const ProductDetail = () => {
  //router
  const { productId } = useParams();

  //api
  const { data, loading } = useAPI('/products/' + productId);

  const [quantity, setQuantity] = useState("1")
  const { addCartItem} = useCart()

  //ui
  if (loading || !data) {
    return (
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
    );
  }

  return (
    <Container>
      <ProductImage src={data.imageUrl} alt={`${data.name}`} />
      <ProductInfo>
        <Subtitle>
          <span>{data.category}</span>
          <span>฿{numberWithCommas(data.price)}</span>
        </Subtitle>
        <Title>{data.name}</Title>
        <Description>{data.description}</Description>
        <Input value={quantity} onChange={(e)=> setQuantity(e.target.value)} style={{ marginBottom: '40px' }} type={'number'} label={'Quantity'} />
        <Button onClick={()=>addCartItem(data, parseInt(quantity))}>Add to Cart</Button>
      </ProductInfo>
    </Container>
  );
};

export default ProductDetail;
