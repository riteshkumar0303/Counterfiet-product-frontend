// src/components/pages/Otp.jsx
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const VERIFY_OTP_URL = 'http://localhost:5000/api/auth/verify-otp';

export default function Otp() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const errRef = useRef();

  const email = location.state?.email || sessionStorage.getItem('tempEmail');
  const role = location.state?.role || sessionStorage.getItem('tempRole');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, [email, navigate]);

  useEffect(() => {
    setErrMsg('');
  }, [otp]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow single digit
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        // Clear current input
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous input and clear it
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (pastedData.match(/^\d{6}$/)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setErrMsg('Please enter complete OTP');
      return;
    }

    setErrMsg('');
    setLoading(true);

    try {
      const response = await axios.post(VERIFY_OTP_URL, {
        email,
        otp: otpString,
      });

      const { token, user } = response.data;

      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Update Auth Context
      setAuth({
        user: user.name,
        email: user.email,
        role: user.role.toLowerCase(),
        token: token,
      });

      // Clear session storage
      sessionStorage.removeItem('tempEmail');
      sessionStorage.removeItem('tempRole');

      // Role-based routing
      const roleRoutes = {
        admin: '/admin',
        manufacturer: '/manufacturer',
        supplier: '/supplier',
        retailer: '/retailer',
        manager: '/profile',
        member: '/',
      };

      navigate(roleRoutes[user.role.toLowerCase()] || '/', { replace: true });

    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err) => {
    if (!err?.response) {
      setErrMsg('No Server Response');
    } else if (err.response.status === 401) {
      setErrMsg('Invalid or expired OTP');
    } else {
      setErrMsg('Verification Failed');
    }
    errRef.current?.focus();
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setErrMsg('');

    try {
      await axios.post('http://localhost:5000/api/auth/resend-otp', {
        email,
      });

      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      alert('OTP resent successfully!');
    } catch (err) {
      setErrMsg('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
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
            Verify OTP
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Enter the 6-digit code sent to <br />
            <strong>{email}</strong>
          </Typography>

          {errMsg && (
            <Alert
              severity="error"
              ref={errRef}
              sx={{ width: '100%', mb: 2 }}
              onClose={() => setErrMsg('')}
            >
              {errMsg}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: '100%' }}
          >
            {/* OTP Input Boxes */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                mb: 3,
              }}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(el) => (inputRefs.current[index] = el)}
                  style={{
                    width: '50px',
                    height: '50px',
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    border: '2px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ccc';
                  }}
                />
              ))}
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ mt: 2, mb: 2, py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Verify OTP'
              )}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Didn't receive the code?{' '}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: '#667eea',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </Typography>
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button onClick={() => navigate('/login')}>Back to Login</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
