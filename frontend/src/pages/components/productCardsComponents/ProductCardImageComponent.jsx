import React from 'react';
import Card from 'react-bootstrap/Card';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

function ProductCardImage({ item }) {
  //console.log(API_BASE_URL)
  return (
    <Card.Img
      variant="top"
      src={`${API_BASE_URL}product-images/${item['Supplier Product Code']}.jpg`}
      onError={(e) => {
        //console.error('Error loading image:', e.target.src);
        e.target.onerror = null;
        e.target.src = `${API_BASE_URL}product-images/errorImage.jpg`;
      }}
    />

  );
}

export default ProductCardImage;
