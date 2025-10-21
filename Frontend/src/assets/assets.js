 import logo from '../assets/logo.png';
import slider_1 from '../assets/slider_1.jpg';
import slider_2 from '../assets/slider_2.webp';
import slider_3 from '../assets/slider_3.webp';
import product1 from '../assets/product1.jpeg';
import product2 from '../assets/product2.jpeg';
import product3 from '../assets/product3.jpeg';
import product4 from '../assets/product4.jpeg';
import product5 from '../assets/product5.jpeg';
import Hero_Banner from '../assets/Hero_Banner.jpg';
import Veg_Collection_Section from '../assets/Veg_Collection_Section.png';
import Fruit_Collection_Section from '../assets/Fruit_Collection_Section.jpg';
import Featured_Collection from '../assets/Featured_Collection.jpg';
import Login_Image from '../assets/Login_Image.jpg';

// ✅ Product data list
const products = [
  {
    id: 1,
    name: "Vitamin C Face Wash",
    image: product1,
    rating: 4.5,
    packs: [
      { size: "100g", mrp: 499, price: 349 },
      { size: "500g", mrp: 999, price: 799 },
      { size: "1kg", mrp: 1599, price: 1299 },
    ],
  },
  {
    id: 2,
    name: "Niacinamide Face Wash",
    image: product2,
    rating: 4.2,
    packs: [
      { size: "100g", mrp: 399, price: 299 },
      { size: "500g", mrp: 799, price: 599 },
      { size: "1kg", mrp: 1399, price: 1099 },
    ],
  },
  {
    id: 3,
    name: "Hyaluronic Acid Gel",
    image: product3,
    rating: 4.8,
    packs: [
      { size: "100g", mrp: 599, price: 449 },
      { size: "500g", mrp: 1099, price: 899 },
      { size: "1kg", mrp: 1799, price: 1499 },
    ],
  },
  {
    id: 4,
    name: "Retinol Night Cream",
    image: product4,
    rating: 4.6,
    packs: [
      { size: "100g", mrp: 699, price: 499 },
      { size: "500g", mrp: 1299, price: 999 },
      { size: "1kg", mrp: 1899, price: 1499 },
    ],
  },
  {
    id: 5,
    name: "Charcoal Detox Face Wash",
    image: product5,
    rating: 4.3,
    packs: [
      { size: "100g", mrp: 449, price: 299 },
      { size: "500g", mrp: 899, price: 699 },
      { size: "1kg", mrp: 1499, price: 1199 },
    ],
  },
];

// ✅ All assets grouped together
const assets = {
  logo,
  slider_1,
  slider_2,
  slider_3,
  product1,
  product2,
  product3,
  product4,
  product5,
  Hero_Banner,
  Fruit_Collection_Section,
  Veg_Collection_Section,
  Featured_Collection,
  Login_Image,
  products,
};

// ✅ Export both
export { assets, products };
