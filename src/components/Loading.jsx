import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
                bgcolor: '#f5f7fa' // Light background for contrast
            }}
        >
            <CircularProgress size={60} thickness={4} sx={{ color: '#2563EB' }} />
            <Typography
                variant="h6"
                sx={{
                    marginTop: 2,
                    color: '#4B4B6A',
                    fontWeight: 500
                }}
            >
                Loading...
            </Typography>
        </Box>
    );
};

export default Loading;
