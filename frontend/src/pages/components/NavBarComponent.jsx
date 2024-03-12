import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../AuthContext'; // Update the path based on your project structure
import '../css/NavBar.css';

function ToolBar() {
  const { isLoggedIn, handleLogout, checkAuthenticationStatus, user } = useAuth();
  const [loading, setLoading] = useState(true);
console.log(user)
  useEffect(() => {
    const fetchData = async () => {
      await checkAuthenticationStatus();
      setLoading(false);
    };

    fetchData();
  }, [checkAuthenticationStatus]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img src="Katalog.png" alt="Katalog Logo" className="logo" /> {/* Replace with your logo */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && <Nav.Link as={Link} to="/all-products">All Products</Nav.Link>}
            {isLoggedIn && <Nav.Link as={Link} to="/purchase-order">Purchase Order</Nav.Link>}
            {isLoggedIn && <Nav.Link as={Link} to="/my-purchase-orders">My Purchase Orders</Nav.Link>}
          </Nav>
          <Nav className="ml-auto">
          {isLoggedIn ? <Nav.Link>{user}</Nav.Link> : <Nav.Link>Guest</Nav.Link>}
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            )}
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ToolBar;