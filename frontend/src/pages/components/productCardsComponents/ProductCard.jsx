import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ProductCardImage from './ProductCardImageComponent';
import ProductCardDetails from './ProductCardDetailsComponent';
import AddToPurchaseButton from './AddToPoButtonComponent';
import styled from 'styled-components';
import { defaultColumns, defaultTitleColumns } from '../../config/productCardConfig'


const StyledCard = styled(Card)`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  height: 100%;
`;

const StyledCardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductCard = ({ product }) => {
    return (
    <Col xs={12} md={3}>
      <StyledCard>
        <ProductCardImage item={product} />
        <StyledCardBody>
          {/* Pass the columns and titleColumns as props to ProductCardDetails */}
          <ProductCardDetails item={product} columns={defaultColumns} titleColumns={defaultTitleColumns} />
          <AddToPurchaseButton item={product} />
        </StyledCardBody>
      </StyledCard>
    </Col>
  );
};

export default ProductCard;
