import React from 'react';
import Container from 'react-bootstrap/Container';
import './css/Homepage.css';

const HomePage = () => {
  return (
    <Container className="homepage-container">
      <header className="hero-section text-center">
        <img src="K.png" alt='Katalog Logo' className='homepage-logo' />
        <h1>Streamlining Your Procurement Process</h1>
      </header>

      <section className="feature-highlights text-center">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature">
            <img src="feature1.png" alt="Product Catalog" className="feature-image" />
            <h3>Product Catalog</h3>
            <p>Browse and manage a wide range of products easily.</p>
          </div>
          <div className="feature">
            <img src="feature2.png" alt="Purchase Orders" className="feature-image" />
            <h3>Purchase Orders</h3>
            <p>Add items to your purchase order and submit it to the database seamlessly.</p>
          </div>
          <div className="feature">
            <img src="feature3.png" alt="Order History" className="feature-image" />
            <h3>Order History</h3>
            <p>Review and access all your previously created purchase orders in one place.</p>
          </div>
        </div>
      </section>

      <section className="about-section text-center">
        <h2>About Us</h2>
        <p>
          Katalog is designed to simplify the procurement process,
          making it easy for you to manage and track your purchase orders efficiently.
        </p>
      </section>
    </Container>
  );
};

export default HomePage;
