const db = require('./connection');
const { User, Dish, Culture, Order } = require('../models');

db.once('open', async () => {
  await Culture.deleteMany();

  const cultures = await Culture.insertMany([
    { 
      name: 'Co Do Restaurant',
      culture: 'Asian',
      description:
        'Restaurants serving Vietnamese cuisine.',
      image: 'Codo.jpg'
    },
    {
      name: 'Malaya Cuisine',
      culture: 'Asian',
      description:
        'Restaurants serving Malasian cuisine.',
      image: 'malaya.jpg'
    },
    {
      name: 'Orientable',
      culture: 'Asian',
      description:
        'Restaurants serving Korean cuisine.',
      image: 'orientable.jpg'
    },
    {
      name: 'Fratellina Restaurant',
      culture: 'Italian',
      description:
        'Restaurants serving Italian cuisine.',
      image: 'fratellino.jpg'
    },
    {
      name: 'Kebab Stick',
      culture: 'Middle East',
      description:
        'Restaurants serving Middle East cuisine.',
      image: 'kebab.jpg'
    },
    {
      name: 'Urban Burger',
      culture: 'UK',
      description:
        'Restaurants serving UK burger.',
      image: 'urban.jpg'
    },
  ]);

  console.log('cultures seeded');

  await Dish.deleteMany();

  const dishes = await Dish.insertMany([
    {
      name: 'Chili Beef Soup with Sliced Rare Beef',
      description:
        'Traditional Vietnamese style Hue. Sliced beef, pork, beef loaf, blood and prawn cake.',
      image: 'bbh.jpeg',
      culture: cultures[0]._id,
      price: 13.50,
      quantity: 200
    },
    {
      name: 'Broken Rice',
      description:
        'With shredded pork, grilled pork, egg and egg pate.',
      image: 'brokenrice.jpeg',
      culture: cultures[0]._id,
      price: 15.50,
      quantity: 200
    },
    {
      name: 'Special Beef and Chicken Combination Rice Noodle Soup',
      culture: cultures[0]._id,
      description:
        'Traditional combination Pho',
      image: 'pho.jpeg',
      price: 15.00,
      quantity: 200
    },
    {
      name: 'Vietnamese Pancake',
      culture: cultures[0]._id,
      description:
        'include pork, prawns, diced green onion, mung bean, and bean sprouts.',
      image: 'vpancake.jpg',
      price: 20.00,
      quantity: 150
    },
    {
      name: 'Roti',
      culture: cultures[1]._id,
      description:
        'Two pieces. Malaysian Indian bread.',
      image: 'roti.jpeg',
      price: 8.80,
      quantity: 300
    },
    {
      name: 'Chef Special Curry Laksa',
      culture: cultures[1]._id,
      description:
        'Laksa consists of thick wheat noodles or rice vermicelli with chicken, prawn or fish, served in spicy soup based on either rich and spicy curry coconut milk or on sour asam (tamarind or gelugur).',
      image: 'laksa.jpeg',
      price: 18.80,
      quantity: 300
    },
    {
      name: 'Nasi Lemak',
      culture: cultures[1]._id,
      description:
        'rice made fragrant with coconut cream and pandan leaves. Include fried anchovies, sliced cucumbers, fried fish known as ikan selar, and a sweet chili sauce.',
      image: 'nasi.jpeg',
      price: 17.50,
      quantity: 300
    },
    {
      name: 'CHILLI RICE CAKE (TTEOKBOKKI*)',
      culture: cultures[2]._id,
      description:
        'Stir-fried Rice cake with Fish cakes, Onions, Carrot, Cabbage and Home-made Chilli Paste (Spicy).',
      image: 'tbk.jpeg',
      price: 18.00,
      quantity: 300
    },
    {
      name: 'KIMCHI FRIED RICE ',
      culture: cultures[2]._id,
      description: 'With one main ingredient choice of Beef, Pork and Mushrooms. Kimchi: Fermented Cabbage with Chiili, Fish Sauce, Vegetables and Fruits (Spicy).',
      image: 'kcr.jpeg',
      price: 18.00,
      quantity: 500
    },
    {
      name: 'JAPCHAE',
      culture: cultures[2]._id,
      description:
        ' Stir-Fried Sticky Sweat Potato Noodle, 1 Selection of Meat, Vegetable, Egg, Fried Shallot, Crispy Seaweed with Home-Made Soy Sauce.',
      image: 'jj.jpeg',
      price: 18.00,
      quantity: 600
    },
    {
      name: 'Bolognese',
      culture: cultures[3]._id,
      description:
        'slow braised Ragu of veal & pork mince with fresh egg Tagliatelle & freshly grated Parmesan.',
      image: 'bolognese.jpeg',
      price: 25.90,
      quantity: 300
    },
    {
      name: 'Antipasto',
      culture: cultures[3]._id,
      description:
        'A selection of daily made appetizers, Italian cured meats, premium cheeses, white anchovies, olives and house made Focaccia.',
      image: 'antipasto.jpeg',
      price: 29.90,
      quantity: 600
    },
    {
      name: 'Margherita',
      culture: cultures[3]._id,
      description:
        'Bocconcini, tomato, Sugo sauce, Mozzarella, fresh basil &olive oil.',
      image: 'margherita.jpeg',
      price: 19.90,
      quantity: 600
    },
    {
      name: 'Mixed Kebab',
      culture: cultures[4]._id,
      description:
        '100% lamb,chicken shaved off the spit wrapped in fresh bread with salad and sauce.',
      image: 'kebab.png',
      price: 13.50,
      quantity: 600
    },
    {
      name: 'Lamb Shank and Rice',
      culture: cultures[4]._id,
      description:
        'Lamb shank, served with rice, salad, and garlic yogurt or mint sauce.',
      image: 'lambrice.jpeg',
      price: 19.99,
      quantity: 600
    },
    {
      name: 'Urban Crispy',
      culture: cultures[5]._id,
      description:
        'Fried chicken, Urban mayonnaise, lettuce, tomato, onion roasted capsicum and tomato sauce.',
      image: 'crispyburger.jpeg',
      price: 13.75,
      quantity: 600
    },
    {
      name: 'Tropico',
      culture: cultures[5]._id,
      description:
        'Angus beef patty, American a cheese, tomato sauce, lettuce, onion, tomato slice, grilled pineapple, beetroot, beef bacon, egg and Urban mayonnaise.',
      image: 'tropical.jpeg',
      price: 16.75,
      quantity: 600
    },
    {
      name: 'Osum',
      culture: cultures[5]._id,
      description:
        'Angus beef patty, American cheese, Swiss cheese, beef bacon, lettuce, onion, tomato slice, jalapenos, tomato sauce, saute mushroom and Urban spicy mayonnaise.',
      image: 'osum.jpeg',
      price: 15.55,
      quantity: 600
    },
  ]);

  console.log('dishes seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Tommy',
    lastName: 'Lu',
    email: 'tl@testmail.com',
    password: 'pw123456789',
    orders: [
      {
        dishes: [dishes[0]._id, dishes[0]._id, dishes[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Jenny',
    lastName: 'Hoang',
    email: 'jh@testmail.com',
    password: 'pw123456789'
  });

  console.log('users seeded');

  process.exit();
});
