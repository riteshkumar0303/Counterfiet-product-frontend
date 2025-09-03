import { Box, Paper, Typography, Button } from '@mui/material';
import QrScanner from '../QrScanner';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ScannerPage = () => {
    const CONTRACT_ADDRESS  = '0x62081f016446585cCC507528cc785980296b4Ccd';
    const [qrData, setQrData] = useState('');

    const { auth } = useAuth();
    const navigate = useNavigate();
    
    const passData = (data) => {
        setQrData(data);
        console.log("qrdata 1: ", qrData);
    };

    useEffect(() => {
        console.log("auth: ", auth);
        console.log("qrdata 2: ", qrData);

        const arr = qrData.split(",");
        const contractAddress = arr[0];

        if(contractAddress){
            if (contractAddress === CONTRACT_ADDRESS) {
                if (auth.role === "supplier" || auth.role === "retailer") {
                    navRole();
                } else {
                    navUser();
                }
            } else {
                navFakeProduct();
            }
        }
    }, [qrData]);

    const navRole = () => {
        navigate('/update-product', { state: { qrData }});
    };

    const navUser = () => {
        navigate('/authentic-product', { state: { qrData }});
    };

    const navFakeProduct = () => {
        navigate('/fake-product');
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Box sx={{
            background: 'linear-gradient(to bottom right, #e0f2fe, #f3e8ff)',
            Height: "100vh",
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: -2,
            overflowY: "auto",
            paddingTop: "64px",
            paddingBottom: "64px"
        }}>
            <Paper elevation={3} sx={{
                width: "400px",
                margin: "auto",
                marginTop: "10%",
                marginBottom: "10%",
                padding: "3%",
                backgroundColor: "#e3eefc"
            }}>
                <Box sx={{ textAlign: "center", marginBottom: "5%" }}>
                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: "center",
                            marginBottom: "3%",
                            fontFamily: 'Gambetta',
                            fontWeight: "bold",
                            fontSize: "2.5rem"
                        }}
                    >
                        Scan QR Code
                    </Typography>

                    <QrScanner passData={passData} />

                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Button onClick={handleBack} sx={{ marginTop: "5%" }}>
                            Back
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default ScannerPage;
