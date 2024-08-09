const { MongoClient } = require('mongodb');

async function main() {
  const uri =
    'mongodb+srv://mernproject:mernproject@mernproject.c1gssia.mongodb.net/mernproject?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('mernproject');
    const collection = database.collection('products');

    const products = [
      {
        _id: '66ad75f3bb82bf1ec7c4884f',
        name: 'Sample Product Updated',
        description: 'This is a sample product.',
        price: 20.99,
        category: 'Sample Category 1',
        featured: true,
        created: new Date('2024-08-03T00:12:35.360Z'),
        __v: 0,
        image: 'images/product1.jpg',
      },
      {
        _id: '66ad7619bb82bf1ec7c48851',
        name: 'Deluxe Coffee Maker',
        description:
          'Brews coffee with precision and includes a built-in grinder.',
        price: 129.99,
        category: 'Appliances',
        featured: true,
        created: new Date('2024-08-03T00:13:13.825Z'),
        __v: 0,
        image: 'images/product2.jpg',
      },
      {
        _id: '66ad7625bb82bf1ec7c48853',
        name: 'Wireless Headphones',
        description:
          'Noise-cancelling over-ear headphones with long battery life.',
        price: 199.99,
        category: 'Electronics',
        featured: true,
        created: new Date('2024-08-03T00:13:25.670Z'),
        __v: 0,
        image: 'images/product3.jpg',
      },
      {
        _id: '66ad762abb82bf1ec7c48855',
        name: 'Organic Green Tea',
        description: '100% organic green tea leaves from the finest gardens.',
        price: 14.99,
        category: 'Groceries',
        featured: false,
        created: new Date('2024-08-03T00:13:30.774Z'),
        __v: 0,
        image: 'images/product4.jpg',
      },
      {
        _id: '66ad762fbb82bf1ec7c48857',
        name: 'Running Shoes',
        description:
          'Lightweight and comfortable shoes for long-distance running.',
        price: 89.99,
        category: 'Sportswear',
        featured: false,
        created: new Date('2024-08-03T00:13:35.670Z'),
        __v: 0,
        image: 'images/product5.jpg',
      },
      {
        _id: '66ad7634bb82bf1ec7c48859',
        name: 'Smartphone Stand',
        description:
          'Adjustable stand for smartphones and tablets, ideal for video calls.',
        price: 19.99,
        category: 'Accessories',
        featured: true,
        created: new Date('2024-08-03T00:13:40.844Z'),
        __v: 0,
        image: 'images/product6.jpg',
      },
      {
        _id: '66ad7639bb82bf1ec7c4885b',
        name: 'Yoga Mat',
        description:
          'Eco-friendly, non-slip yoga mat perfect for all types of yoga.',
        price: 25.99,
        category: 'Fitness',
        featured: true,
        created: new Date('2024-08-03T00:13:45.873Z'),
        __v: 0,
        image: 'images/product7.jpg',
      },
      {
        _id: '66ad7641bb82bf1ec7c4885d',
        name: 'Stainless Steel Water Bottle',
        description: 'Keeps drinks cold for 24 hours and hot for 12 hours.',
        price: 29.99,
        category: 'Home & Kitchen',
        featured: false,
        created: new Date('2024-08-03T00:13:53.798Z'),
        __v: 0,
        image: 'images/product8.jpg',
      },
      {
        _id: '66ad7648bb82bf1ec7c4885f',
        name: 'Bluetooth Speaker',
        description:
          'Portable speaker with excellent sound quality and long battery life.',
        price: 59.99,
        category: 'Electronics',
        featured: false,
        created: new Date('2024-08-03T00:14:00.612Z'),
        __v: 0,
        image: 'images/product9.jpg',
      },
      {
        _id: '66ad764fbb82bf1ec7c48861',
        name: 'Electric Guitar',
        description:
          'High-quality electric guitar for beginners and professionals.',
        price: 349.99,
        category: 'Musical Instruments',
        featured: true,
        created: new Date('2024-08-03T00:14:07.300Z'),
        __v: 0,
        image: 'images/product10.jpg',
      },
      {
        _id: '66ad79fc97eabd1e83609090',
        name: 'Electric Guitar Fender',
        description:
          'High-quality electric guitar for beginners and professionals.',
        price: 349.99,
        category: 'Musical Instruments',
        featured: true,
        created: new Date('2024-08-03T00:29:48.628Z'),
        __v: 0,
        image: 'images/product1.jpg', // Reusing image for demo purposes
      },
      // Add more products here
    ];

    const bulkOps = products.map((product) => ({
      updateOne: {
        filter: { _id: product._id },
        update: { $set: product },
        upsert: true,
      },
    }));

    const result = await collection.bulkWrite(bulkOps);
    console.log(`${result.upsertedCount} products were upserted`);
    console.log(`${result.modifiedCount} products were modified`);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
