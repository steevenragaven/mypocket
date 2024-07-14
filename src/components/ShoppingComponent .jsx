// src/components/ShoppingComponent.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { addToCart } from '../services/CartService'; // Adjust the path as necessary

const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const PriceTag = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 10px;
`;

const ShoppingComponent = () => {
  const { categoryid, categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [userId] = useState(1); // Assuming a logged-in user with ID 1 for simplicity

  useEffect(() => {
    console.log(`Category ID: ${categoryid}`);
    fetch(`http://localhost:3000/products/${categoryid}`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [categoryid]);

  const handleAddToCart = async (productId, shop) => {
    try {
      const quantity = 1; // Assuming adding one item at a time for simplicity
      await addToCart(userId, productId, quantity, shop);
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart.');
    }
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
      <Row>
        {products.map(product => (
          <Col key={product.productid} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <StyledCard>
              <Card.Img variant="top" src={product.productimage} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <strong>Shop:</strong> {product.shop}
                </Card.Text>
                <Card.Text>
                  <strong>Quantity Left:</strong> {product.stockquantity}
                </Card.Text>
                <PriceTag>${product.price}</PriceTag>
                <Button variant="primary" onClick={() => handleAddToCart(product.productid, product.shop)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ShoppingComponent;
