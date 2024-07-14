// src/services/ProductService.js
export const getProductByName = async (name) => {
    try {
      const response = await fetch(`http://localhost:3000/products?name=${encodeURIComponent(name)}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch product details');
      }
      return data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  };
  