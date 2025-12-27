import '../../css/Role.css'
import { TextField, Box, Paper, Typography, Autocomplete, Button, Alert } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import bgImg from '../../img/bg.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ROLES = ["manufacturer", "supplier", "retailer"];

const AddAccount = () => {
    const navigate = useNavigate();
    const errRef = useRef();

    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [role, setRole] = useState(ROLES[0]);
    const [mobile, setMobile] = useState('');

    // UI States
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setErrMsg('');
        // Don't clear successMsg here, otherwise it disappears when form resets
    }, [name, email, pwd, confirmPwd, role, mobile]);

    const handleBack = () => {
        navigate(-1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg(''); // Clear previous success message on new attempt

        // Basic Validation
        if (pwd !== confirmPwd) {
            setErrMsg("Passwords do not match");
            setLoading(false);
            return;
        }

        // construct payload
        const payload = {
            name,
            email,
            password: pwd,
            mobile
        };

        // Determine endpoint
        // Routes are: /register-manufacturer, /register-supplier, /register-retailer
        const endpoint = `register-${role}`;
        const url = `http://localhost:5000/api/auth/${endpoint}`;

        try {
            const response = await axios.post(url, payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.data.success) {
                setSuccessMsg(`Successfully created ${role} account!`);
                // Reset form
                setName('');
                setEmail('');
                setPwd('');
                setConfirmPwd('');
                setMobile('');
                setRole(ROLES[0]);
            }

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg(err.response.data.message || 'Invalid Request');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current?.focus();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            backgroundImage: `url(${bgImg})`,
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
            width: "100%",
            paddingTop: "120px",
            paddingBottom: 4
        }}>
            <Paper elevation={3} sx={{ width: "400px", margin: "auto", padding: "3%", backgroundColor: "#e3eefc" }}>

                <Typography
                    variant="h2"
                    sx={{
                        textAlign: "center", marginBottom: "3%",
                        fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem"
                    }}
                >
                    Add Account
                </Typography>

                {errMsg && <Alert severity="error" ref={errRef} sx={{ mb: 2 }}>{errMsg}</Alert>}
                {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

                <form onSubmit={handleSubmit}>

                    {/* ROLE SELECTION */}
                    <Autocomplete
                        disablePortal
                        id="combo-box-role"
                        options={ROLES}
                        fullWidth
                        value={role}
                        onChange={(event, newRole) => {
                            if (newRole) {
                                setRole(newRole);
                                setSuccessMsg(''); // Clear success message when switching roles
                            }
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                margin="normal"
                                label="Role"
                                variant="outlined"
                                required
                            />}
                    />

                    {/* NAME */}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        variant="outlined"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* EMAIL */}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* MOBILE */}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Mobile Number"
                        variant="outlined"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />

                    {/* PASSWORD */}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type='password'
                        variant="outlined"
                        required
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />

                    {/* CONFIRM PASSWORD */}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm Password"
                        type='password'
                        variant="outlined"
                        required
                        value={confirmPwd}
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        error={pwd !== confirmPwd && confirmPwd.length > 0}
                        helperText={pwd !== confirmPwd && confirmPwd.length > 0 ? "Passwords do not match" : ""}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        sx={{ width: "100%", marginTop: "3%", backgroundColor: '#98b5d5', '&:hover': { backgroundColor: '#618dbd' } }}
                    >
                        {loading ? 'Creating...' : 'Create Account'}
                    </Button>

                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            onClick={handleBack}
                            sx={{ marginTop: "5%" }}
                        >
                            Back
                        </Button>
                    </Box>

                </form>
            </Paper>
        </Box>
    );
}

export default AddAccount;