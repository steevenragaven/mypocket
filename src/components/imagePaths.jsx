// src/components/productData.js

import redappleImg from '../Products/fruits/fresh/apple1.jpeg';
import orangeImg from '../Products/fruits/fresh/orange.jpg';
import watermelonImg from '../Products/fruits/fresh/watermelon.jpg';
import banana1Img from '../Products/fruits/fresh/banana1.jpg';
import banana2Img from '../Products/fruits/fresh/banana2.jpeg';
import carrotImg from '../Products/vegetable/fresh/carrot.jpg';
import tomatoImg from '../Products/vegetable/fresh/tomato.jpg';
import milkImg from '../Products/dairy/Milk/milk1.jpg';
import cheeseImg from '../Products/dairy/cheese/cheese.jpg';
import beefImg from '../Products/meat/chicken.webp';
import chickenImg from '../Products/meat/meat.jpg';
import bread from '../Products/bakery/bread/bread.jpg';
import jam from '../Products/cereal/jam/jam.jpg';
const products = {
  fruits: [
    { name: 'Red Apple', image: redappleImg, pricePerLB: 1.99, inStock: 20 },
    { name: 'Orange', image: orangeImg, pricePerLB: 0.79, inStock: 15 },
    { name: 'Watermelon', image: watermelonImg, pricePerLB: 0.49, inStock: 10 },
    { name: 'Banana (Type 1)', image: banana1Img, pricePerLB: 0.69, inStock: 30 },
    { name: 'Banana (Type 2)', image: banana2Img, pricePerLB: 0.69, inStock: 25 },
  ],
  vegetables: [
    { name: 'Carrot', image: carrotImg, pricePerLB: 0.59, inStock: 35 },
    { name: 'Tomato', image: tomatoImg, pricePerLB: 0.89, inStock: 40 },
  ],
  dairy: [
    { name: 'Milk', image: milkImg, pricePerGallon: 2.99, inStock: 50 },
    { name: 'Cheese', image: cheeseImg, pricePerLB: 4.99, inStock: 20 },
  ],
  meat: [
    { name: 'Beef', image: beefImg, pricePerLB: 7.99, inStock: 10 },
    { name: 'Chicken', image: chickenImg, pricePerLB: 4.99, inStock: 15 },
  ],
  bakery: [
    { name: 'Bread', image: bread, pricePerLB: 1.99, inStock: 10 }
  ],
  breakfast: [
    { name: 'jam', image: jam, pricePerLB: 2.99, inStock: 10 }

  ]
};

export default products;
