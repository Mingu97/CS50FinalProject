import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap/';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './css/MergedLoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false); // State to trigger the fade-out effect
  
  const handleLoginRequest = async () => {
    try {
      // Attempt login
      const loginSuccessful = await handleLogin(username, password, navigate);

      if (loginSuccessful) {
        setFadeOut(true); // Set fadeOut only for successful login
      }
    } catch (error) {
      // Handle login error (if needed)
      console.error('Login failed', error);
    }
  };


  return (
    <Container className={`mt-5 ${fadeOut ? 'fade-out' : ''} login-form-container`}>
      <Form className='login-form'>
        <Form.Group className='login-form-group' controlId="formBasicUsername">
          <Form.Label className='login-form-label'> Username</Form.Label>
          <Form.Control
            className='login-form-control'
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='login-form-group' controlId="formBasicPassword">
          <Form.Label className='login-form-label'>Password</Form.Label>
          <Form.Control
            className='login-form-control'
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          className='login-form-button'
          variant="primary"
          type="button"
          onClick={handleLoginRequest}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
