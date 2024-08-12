import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetailsCard from './product-details-card';
import './product-details-page.css';

import product1 from '../../images/product1.jpg';
import product2 from '../../images/product2.jpg';
import product3 from '../../images/product3.jpg';
import product6 from '../../images/product6.jpg';
import product7 from '../../images/product7.jpg';
import product10 from '../../images/product10.jpg';

const images = {
  'images/product1.jpg': product1,
  'images/product2.jpg': product2,
  'images/product3.jpg': product3,
  'images/product6.jpg': product6,
  'images/product7.jpg': product7,
  'images/product10.jpg': product10,
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL;
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const imageSrc = images[product.image] || 'https://via.placeholder.com/300';

  return (
    <div className="product-page-container">
      <ProductDetailsCard
        product={product}
        title={product.name}
        price={product.price}
        description={product.description}
        image={imageSrc}
        id={product._id}
      />
    </div>
  );
};

export default ProductDetailsPage;
