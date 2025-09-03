import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
// import bgImg from '../../img/bg.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [name, setName] = useState([]);
    const [description, setDescription] = useState([]);
    const [role, setRole] = useState([]);
    const [website, setWebsite] = useState([]);
    const [location, setLocation] = useState([]);
    // const [image, setImage] = useState({
    //     file: [],
    //     filepreview: null
    // });

    const { auth } = useAuth()
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    const handleData = async (e) => {
        const res = await axios.get(`https://counterfiet-product-backend-1.onrender.com//profile/${auth.user}`)
            .then(res => {
                console.log(JSON.stringify(res?.data[0]));
                setName(res?.data[0].name);
                setDescription(res?.data[0].description);
                setRole(res.data[0].role);
                setWebsite(res?.data[0].website);
                setLocation(res?.data[0].location);
                // setImage(res.data.image);
            })
    }

    useEffect(() => {
        handleData();
    }, []);

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
                width: "400px", margin: "auto", marginTop: "10%", marginBottom: "10%", padding: "3%", backgroundColor: "#e3eefc"
            }}>
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        margin: "auto",
                        marginBottom: "3%",
                        backgroundColor: "#3f51b5"
                    }}
                >
                    {name[0]}
                </Avatar>

                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center", marginBottom: "5%",
                    }}
                >
                    {name}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center", marginBottom: "3%",
                    }}
                >
                    Description: {description}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center", marginBottom: "3%",
                    }}
                >
                    Role: {role}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center", marginBottom: "3%",
                    }}
                >
                    Website: {website}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center", marginBottom: "3%",
                    }}
                >
                    Location: {location}
                </Typography>

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >


                    <Button
                        onClick={handleBack}
                        sx={{
                            marginTop: "7%",
                        }}
                    >
                        Back
                    </Button>

                </Box>

            </Paper>
        </Box>

    );
}

export default Profile;
