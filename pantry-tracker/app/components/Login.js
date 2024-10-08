'use client';
import { useState } from 'react';
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import CustomAlert from './CustomAlert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const router = useRouter();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user._tokenResponse) {
        setAlertMessage('Login Successfully');
        setTimeout(() => {
          router.push('/');
        }, 2000); // Redirect after 2 seconds
      } else {
        setAlertMessage('Please Try Again');
      }
    } catch (error) {
      setAlertMessage(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
    {alertMessage && <CustomAlert message={alertMessage} />}
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login Page
        </Typography>
        <TextField
          label="Email"
          type="email"
          className='bg-white'
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          className='bg-white'
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={login}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
