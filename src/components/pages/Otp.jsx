import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    Box,
    Typography,
    Container
} from '@mui/material';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const VERIFY_OTP_URL = '/verify-otp';

export default function Otp() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const errRef = useRef();

    const [otp, setOtp] = useState('');
    const [key] = useState('default-key'); // static key or session identifier
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [otp]);

    const handleBack = () => navigate('/');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');

        if (!otp) {
            setErrMsg('OTP is required');
            errRef.current?.focus();
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(VERIFY_OTP_URL,
                JSON.stringify({ key, otp }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false,
                }
            );
            const { username, role } = response.data;
            if (!username || !role) {
                setErrMsg('Verification succeeded but response is incomplete.');
                return;
            }
            setAuth({ user: username, role });
            navigate(`/${role}`, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Invalid OTP');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.response.status === 404) {
                setErrMsg('Verification Failed');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            background: "linear-gradient(to bottom right, #e0f2fe, #f3e8ff)",
            minHeight: "100vh",
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: -2,
        }}>
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Box sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                    backgroundColor: '#e3eefc',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography variant="h4" sx={{
                        fontFamily: 'Gambetta',
                        fontWeight: 'bold',
                        mb: 2,
                        textAlign: 'center'
                    }}>
                        Welcome to UltraReal
                    </Typography>
                   
                    {errMsg && (
                        <Typography
                            color="error"
                            ref={errRef}
                            tabIndex={-1}
                            sx={{ mt: 2, textAlign: 'center' }}
                        >
                            {errMsg}
                        </Typography>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Enter OTP"
                            margin="normal"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading || !otp}
                        >
                            {loading ? 'Verifying...' : 'Login'}
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={handleBack}>Back</Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
