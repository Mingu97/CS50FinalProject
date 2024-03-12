// ProductCardDetails.jsx
import React from 'react';
import Card from 'react-bootstrap/Card';
import { defaultColumns, defaultTitleColumns } from '../../config/productCardConfig';

function ProductCardDetails({ item, columns = defaultColumns, titleColumns = defaultTitleColumns }) {

  // Function to render a single Card.Title containing all columns
  const renderTitles = () => {
    // Concatenate the values of all columns
    const title = titleColumns.map(columnName => item[columnName]).join(' ');

    return <Card.Title>{title}</Card.Title>;
  };
  // Function to render text based on the columns array
  const renderText = () => {
    return columns.map((columnName, index) => (
      <Card.Text key={index}>{item[columnName]}</Card.Text>
    ));
  };

  return (
    <Card.Body>
      {renderTitles()}
      {renderText()}
    </Card.Body>
  );
}

export default ProductCardDetails;
