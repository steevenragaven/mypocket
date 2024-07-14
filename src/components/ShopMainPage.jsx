import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ShopContainer = styled.div`
  padding: 1rem;
  background: #fff;
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CategoryCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const CategoryTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const ShopMainPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <ShopContainer>
      <h2>Choose a category:</h2>
      <CategoryContainer>
        {categories.map((category, index) => (
          <Link
            to={`/category/${category.categoryid}/${category.name}`}
            key={index}
            style={{ textDecoration: 'none' }}
          >
            <CategoryCard>
              <CategoryImage src={category.itemimage} alt={category.name} />
              <CategoryTitle>{category.name}</CategoryTitle>
            </CategoryCard>
          </Link>
        ))}
      </CategoryContainer>
    </ShopContainer>
  );
};

export default ShopMainPage;
