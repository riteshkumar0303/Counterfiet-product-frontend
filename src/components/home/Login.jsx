// src/components/home/Login.jsx
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LOGIN_URL = 'http://localhost:5000/api/auth/login';

export default function Login() {
  const navigate = useNavigate();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleBack = () => navigate('/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setLoading(true);

    try {
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      });

      // Store email and role for OTP verification
      sessionStorage.setItem('tempEmail', email);
      sessionStorage.setItem('tempRole', response.data.data.role);

      // Navigate to OTP page
      navigate('/Otp', {
        state: {
          email,
          role: response.data.data.role
        }
      });

    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err) => {
    if (!err?.response) {
      setErrMsg('No Server Response');
    } else if (err.response.status === 400) {
      setErrMsg('Please provide email and password');
    } else if (err.response.status === 401) {
      setErrMsg('Invalid credentials');
    } else {
      setErrMsg('Login Failed');
    }
    errRef.current?.focus();
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom right, #e0f2fe, #f3e8ff)',
        minHeight: '100vh',
        width: '100%',
        paddingTop: '120px', // Match Hero page spacing
        paddingBottom: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            backgroundColor: '#e3eefc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Gambetta, serif',
              fontWeight: 'bold',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Welcome to UltraReal
          </Typography>

          <Typography variant="h6" gutterBottom>
            Login
          </Typography>

          {errMsg && (
            <Alert
              severity="error"
              ref={errRef}
              sx={{ width: '100%', mt: 2 }}
              onClose={() => setErrMsg('')}
            >
              {errMsg}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              fullWidth
              required
              label="Email Address"
              margin="normal"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                },
              }}
            />

            <TextField
              fullWidth
              required
              label="Password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                },
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Send OTP'
              )}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleBack}>Back</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
