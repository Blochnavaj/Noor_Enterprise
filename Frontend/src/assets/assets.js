import logo from '../assets/logo.png';
import slider_1 from '../assets/slider_1.jpg';
import slider_2 from '../assets/slider_2.webp';
import slider_3 from '../assets/slider_3.webp';
import Amla_power from '../assets/Amla_power.jpeg'
import Banana_power from '../assets/Banana_power.jpeg'
import Carrot_power from '../assets/Carrot_power.jpeg'
import Green_chili_power from '../assets/Green_chili_power.jpeg'
import Mango_power from '../assets/Mango_power.jpeg'
import Moringa_power from '../assets/Moringa_power.jpeg'
import Onion_power from '../assets/Onion_power.jpeg'
import Orange_power from '../assets/Orange_power.jpeg'
import Palak_power from '../assets/Palak_power.jpeg'
import Papaya_power from '../assets/Papaya_power.jpeg'
import Red_chili_power from '../assets/Red_chili_power.jpeg'
import tomato_power from '../assets/tomato_power.jpeg'
import Hero_Banner from '../assets/Hero_Banner.jpg';
import Veg_Collection_Section from '../assets/Veg_Collection_Section.png';
import Fruit_Collection_Section from '../assets/Fruit_Collection_Section.jpg';
import Featured_Collection from '../assets/Featured_Collection.jpg';
import Login_Image from '../assets/Login_Image.jpg';
import photo from '../assets/Ower_image.jpg'

// ✅ Product data list
const products = [
  {
    id: 1,
    name: "Oragnic Amla Power ",
    images: [Amla_power, Amla_power], // ✅ multiple images
    rating: 4.5,
    packs: [
      { size: "100g", mrp: 499, price: 349 },
      { size: "500g", mrp: 999, price: 799 },
      { size: "1kg", mrp: 1599, price: 1299 },
    ],
  },
  {
    id: 2,
    name: "Carrot Power",
    images: [Carrot_power, Carrot_power], // ✅ array
    rating: 4.2,
    packs: [
      { size: "100g", mrp: 399, price: 299 },
      { size: "500g", mrp: 799, price: 599 },
      { size: "1kg", mrp: 1399, price: 1099 },
    ],
  },
  {
    id: 3,
    name: "Green chili power ",
    images: [Green_chili_power, Green_chili_power],
    rating: 4.8,
    packs: [
      { size: "100g", mrp: 599, price: 449 },
      { size: "500g", mrp: 1099, price: 899 },
      { size: "1kg", mrp: 1799, price: 1499 },
    ],
  },
  {
    id: 4,
    name: "Mango Power ",
    images: [Mango_power, Mango_power],
    rating: 4.6,
    packs: [
      { size: "100g", mrp: 699, price: 499 },
      { size: "500g", mrp: 1299, price: 999 },
      { size: "1kg", mrp: 1899, price: 1499 },
    ],
  },
  {
    id: 5,
    name: "Moringa Power ",
    images: [Moringa_power, Moringa_power],
    rating: 4.3,
    packs: [
      { size: "100g", mrp: 449, price: 299 },
      { size: "500g", mrp: 899, price: 699 },
      { size: "1kg", mrp: 1499, price: 1199 },
    ],
  },
  {
    id: 6,
    name: "Onion Power",
    images: [Onion_power, Onion_power],
    rating: 4.3,
    packs: [
      { size: "100g", mrp: 449, price: 299 },
      { size: "500g", mrp: 899, price: 699 },
      { size: "1kg", mrp: 1499, price: 1199 },
    ],
  },
  {
    id: 7,
    name: "Orange Power ",
    images: [Orange_power,Orange_power],
    rating: 4.3,
    packs: [
      { size: "100g", mrp: 449, price: 299 },
      { size: "500g", mrp: 899, price: 699 },
      { size: "1kg", mrp: 1499, price: 1199 },
    ],
  },
  {
    id: 8,
    name: "Palak Power",
    images: [Palak_power, Palak_power],
    rating: 4.3,
    packs: [
      { size: "100g", mrp: 449, price: 299 },
      { size: "500g", mrp: 899, price: 699 },
      { size: "1kg", mrp: 1499, price: 1199 },
    ],
  },
  {
    id: 9,
    name: "Papaya Power ",
    images: [Papaya_power, Papaya_power],
    rating: 4.3,
    packs: [
      { size: "100g", mrp: 449, price: 299 },
      { size: "500g", mrp: 899, price: 699 },
      { size: "1kg", mrp: 1499, price: 1199 },
    ],
  },
  {
    id: 10,
    name: "Red Chili Power ",
    images: [Red_chili_power, Red_chili_power],
    rating: 4.3,
    packs: [
      { size: "100g", mrp: 449, price: 299 },
      { size: "500g", mrp: 899, price: 699 },
      { size: "1kg", mrp: 1499, price: 1199 },
    ],
  },
  {
    id: 11,
    name: "Tomato Power ",
    images: [tomato_power, tomato_power],
    rating: 4.3,
    packs: [
      { size: "100g", mrp: 449, price: 299 },
      { size: "500g", mrp: 899, price: 699 },
      { size: "1kg", mrp: 1499, price: 1199 },
    ],
  },
  {
    id: 11,
    name: "Banana Power ",
    images: [Banana_power, Banana_power],
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
  photo,
  logo,
  slider_1,
  slider_2,
  slider_3,
  Mango_power, Banana_power, Red_chili_power, Green_chili_power, Palak_power, Carrot_power, Moringa_power, Orange_power, Onion_power, Papaya_power, tomato_power,
  Hero_Banner,
  Fruit_Collection_Section,
  Veg_Collection_Section,
  Featured_Collection,
  Login_Image,
  products,
};

// ✅ Export both
export { assets, products };
