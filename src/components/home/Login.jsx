import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Box,
    Typography,
    Container
} from '@mui/material';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const LOGIN_URL = '/auth';

export default function Login() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleBack = () => navigate('/');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');
        try {
            setLoading(true);
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false,
                }
            );
            console.log("OTP response:", response.data);
            const { username, role } = response.data;
            setAuth({ user: username, role });
            navigate(`/Otp`, { replace: true }); // role-based redirect
        } catch (err) {
            handleError(err, ['Missing Username or Password', 'Unauthorized', 'Login Failed']);
        } finally {
            setLoading(false);
        }
    };

    const handleError = (err, messages) => {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else {
            const status = err.response?.status;
            setErrMsg(messages[status === 400 ? 0 : status === 401 ? 1 : status === 404 ? 2 : 3]);
        }
        errRef.current?.focus();
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
                    <Typography variant="h6" gutterBottom>
                        Login
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
                        <TextField fullWidth required label="Username" margin="normal" onChange={(e) => setUser(e.target.value)} />
                        <TextField fullWidth required label="Password" type="password" margin="normal" onChange={(e) => setPwd(e.target.value)} />
                        <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
                        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
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
