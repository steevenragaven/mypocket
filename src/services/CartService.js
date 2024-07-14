// src/services/CartService.js
export const addToCart = async (userId, productId, quantity, shop) => {
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, productId, quantity, shop })
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add item to cart');
      }
  
      return data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };
  
  export const getCartItems = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/cart?userId=${userId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch cart items');
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  };
  
  export const updateCartItem = async (userId, productId, quantity, shop) => {
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, productId, quantity, shop })
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update cart item');
      }
  
      return data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };
  
  export const removeCartItem = async (userId, productId, shop) => {
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, productId, shop })
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to remove cart item');
      }
  
      return data;
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  };
  
  export const checkout = async (userId, cartItems) => {
    try {
      const response = await fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, cartItems })
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to checkout');
      }
  
      return data;
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }
  };
  