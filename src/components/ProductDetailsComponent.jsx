import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProductByName } from '../services/ProductService';

// Styled components
const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const ProductDetailsCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: left;
  background-color: #fff;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ProductName = styled.h1`
  font-size: 2em;
  color: #333;
`;

const Detail = styled.p`
  font-size: 1.2em;
  color: #555;
`;

const ProductDetailsComponent = () => {
  const { productName } = useParams(); // This will get the product name from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByName(productName);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productName]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <PageContainer>
      <ProductDetailsCard>
        <ProductImage src={product.productimage || 'default-image-path.jpg'} alt={product.name} />
        <ProductName>{product.name || 'N/A'}</ProductName>
        <Detail>Price: Rs {product.price ? product.price.toFixed(2) : 'N/A'}</Detail>
        <Detail>Stock Quantity: {product.stockquantity || 'N/A'}</Detail>
        <Detail>Shop: {product.shop || 'N/A'}</Detail>
        <Detail>Category ID: {product.categoryid || 'N/A'}</Detail>
      </ProductDetailsCard>
    </PageContainer>
  );
};

export default ProductDetailsComponent;
