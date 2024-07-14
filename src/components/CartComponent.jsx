import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';


// Styled components
const CartContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
  margin: 20px;
`;

const CartShopContainer = styled.div`
  margin-bottom: 30px;
`;

const CartItemContainer = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-bottom: 20px;

  &:last-child {
    border-bottom: none;
  }
`;

const CartHeader = styled.div`
  font-size: 1rem;
  color: #333;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 15px;
`;

const ItemList = styled.div``;

const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  padding: 8px 0;

  &:not(:last-child) {
    border-bottom: 1px dashed #ddd;
  }
`;

const ItemDescription = styled.div`
  font-size: 0.9rem;
  color: #333;
`;

const Price = styled.span`
  font-weight: bold;
  text-align: right;
  margin-right: 20px;
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background-color: #cc0000;
  }
`;

const Subtotal = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const Total = styled(Subtotal)`
  font-size: 1.2rem;
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  background-color: #84c225;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  width: 100%;

  &:hover {
    background-color: #739f1a;
  }
`;

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
`;

const EmptyCartMessage = styled.div`
  font-size: 1.5rem;
  color: #333;
  margin-top: 20px;
`;

const EmptyCartImage = styled.img`
  max-width: 200px;
  margin-bottom: 20px;
`;

const CartComponent = () => {
  const [cartData, setCartData] = useState(null);
  const [error, setError] = useState(null);

  const fetchCartData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cart', {
        params: { userId: 1 } // Replace with the actual user ID
      });
      setCartData(response.data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleRemoveItem = async (productId, shop) => {
    try {
      await axios.delete('http://localhost:3000/cart', {
        data: { userId: 1, productId, shop } // Replace with the actual user ID
      });
      fetchCartData(); // Refresh the cart data
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError(error);
    }
  };

  if (error) {
    return <div>Error fetching cart data: {error.message}</div>;
  }

  if (!cartData) {
    return <div>Loading...</div>;
  }

  if (cartData.length === 0) {
    return (
      <EmptyCartContainer>
        <EmptyCartMessage>
          Your cart is empty! <br />
          Why not add some goodies to your cart?
        </EmptyCartMessage>
      </EmptyCartContainer>
    );
  }

  return (
    <CartContainer>
      <h1>My Cart Items</h1>
      {cartData.map((shopData, index) => (
        <CartShopContainer key={index}>
          <CartHeader>
            Shop: {shopData.shop}
          </CartHeader>
          <ItemList>
            {shopData.items.map((item, itemIndex) => (
              <CartItemContainer key={itemIndex}>
                <Item key={itemIndex}>
                  <ItemDescription>
                    {item.quantity} x {item.name}
                  </ItemDescription>
                  <Price>Rs {Number(item.price).toFixed(2)}</Price>
                  <RemoveButton onClick={() => handleRemoveItem(item.product_id, shopData.shop)}>Remove</RemoveButton>
                </Item>
              </CartItemContainer>
            ))}
          </ItemList>
          <Subtotal>
            <span>Sub Total:</span>
            <span>Rs {shopData.summary.subtotal.toFixed(2)}</span>
          </Subtotal>
          <Subtotal>
            <span>Discounts:</span>
            <span>Rs {shopData.summary.discounts.toFixed(2)}</span>
          </Subtotal>
          <Subtotal>
            <span>Delivery Fee:</span>
            <span>Rs {shopData.summary.delivery_fee.toFixed(2)}</span>
          </Subtotal>
          <Total>
            <span>Total to pay for this shop:</span>
            <span>Rs {shopData.summary.total.toFixed(2)}</span>
          </Total>
        </CartShopContainer>
      ))}
      <Total>
        <span>Overall Total to pay:</span>
        <span>Rs {cartData.reduce((total, shopData) => total + shopData.summary.total, 0).toFixed(2)}</span>
      </Total>
      <Link to="/PaymentPage">
        <CheckoutButton>Checkout</CheckoutButton>
      </Link>
    </CartContainer>
  );
};

export default CartComponent;
