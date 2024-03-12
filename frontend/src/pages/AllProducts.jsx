import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SearchBarComponent from './components/SearchBarComponent';
import PaginationComponent from './components/PaginationComponent';
import ProductCard from './components/productCardsComponents/ProductCard';
import { calculatePageIndices, customSearchFilter, fetchProducts } from './components/api';
import { searchConfig } from './config/searchFields';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const {fields} = searchConfig
  useEffect(() => {
    // Fetch the list of products when the component mounts
    fetchProducts().then((data) => setProducts(data));
  }, []);
  console.log(products)
  // Function to filter products based on case-insensitive search query
  const filteredProducts = customSearchFilter(products, searchQuery, { fields });
  
  // Calculate the start and end indices for the current page
  const { totalPages, endIndex, itemsForCurrentPage } = calculatePageIndices(currentPage, filteredProducts);

  return (
    <Container>
      <Container className='mx-auto text-center' style={{ margin: '40px', justifyContent: 'center' }}>
        <SearchBarComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />
      </Container>

      <Container className="mx-auto text-center" style={{ marginTop: '40px' }}>
        <Row className="justify-content-center">
          {itemsForCurrentPage.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Row>
      </Container>


      <Container className="mx-auto text-center" style={{ margin: '40px', justifyContent: 'center' }}>
        <PaginationComponent currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} endIndex={endIndex} filteredProducts={filteredProducts} />
      </Container>
    </Container>
  );
};

export default AllProducts;
