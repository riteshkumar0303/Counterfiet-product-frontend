import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
// import bgImg from '../../img/bg.png';  // You can still use the bgImg if needed.
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import abi from '../../utils/Identeefi.json';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
// import axios from 'axios';



const UpdateProduct = () => {
    const [serialNumber, setSerialNumber] = useState("");
    const [name, setName] = useState("P");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [history, setHistory] = useState([]);
    const [isSold, setIsSold] = useState(false);
    const [image, setImage] = useState({
        file: [],
        filepreview: null
    });

    const CONTRACT_ADDRESS = '0x62081f016446585cCC507528cc785980296b4Ccd';
    const CONTRACT_ABI = abi.abi;

    // const { auth } = useAuth(); // Unused
    const navigate = useNavigate();
    const location = useLocation();
    const qrData = location.state?.qrData;

    useEffect(() => {
        const getImage = async (imageName) => {
            setImage(prevState => ({
                ...prevState,
                filepreview: `http://localhost:5000/file/product/${imageName}`
            }));
        }

        const setData = (d) => {
            const arr = d.split(",");
            setName(arr[1]);
            setBrand(arr[2]);
            setDescription(arr[3].replace(/;/g, ","));
            getImage(arr[4]);

            const hist = [];
            let start = 5;

            for (let i = 5; i < arr.length; i += 5) {
                const actor = arr[start + 1];
                const location = arr[start + 2].replace(/;/g, ",");
                const timestamp = arr[start + 3];
                const isSold = arr[start + 4] === "true" ? setIsSold(true) : false;

                hist.push({ actor, location, timestamp, isSold });
                start += 5;
            }
            setHistory(hist);
        }

        const handleScan = async (qrData) => {
            const data = qrData.split(",");
            const contractAddress = data[0];
            setSerialNumber(data[1]);

            if (contractAddress === CONTRACT_ADDRESS) {
                try {
                    const { ethereum } = window;

                    if (ethereum) {
                        const provider = new ethers.providers.Web3Provider(ethereum);
                        const signer = provider.getSigner();
                        const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                        const product = await productContract.getProduct(data[1].toString());
                        setData(product.toString());
                    } else {
                        alert("Ethereum object doesn't exist! Please connect your wallet first!");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };

        if (qrData) {
            handleScan(qrData);
        }
    }, [qrData, CONTRACT_ADDRESS, CONTRACT_ABI]);

    const handleBack = () => {
        navigate(-1);
    }

    const getHistory = () => {
        return history.slice(1).map((item, index) => {  // Start from index 1, skipping the first iteration
            const date = dayjs(item.timestamp * 1000).format('MM/DD/YYYY');
            const time = dayjs(item.timestamp * 1000).format('HH:mm a');
            return (
                <TimelineItem key={index}>
                    <TimelineOppositeContent color="textSecondary">
                        {time} {date}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography>Location: {item.location}</Typography>
                    </TimelineContent>
                </TimelineItem>
            );
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/update-product-details', { state: { qrData } });
    }

    return (
        <Box sx={{
            background: 'linear-gradient(to bottom right, #e0f2fe, #f3e8ff)',
            minHeight: "100vh",
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: -2,
            overflowY: "scroll"
        }}>
            <Paper elevation={3} sx={{ width: "400px", margin: "auto", marginTop: "10%", marginBottom: "10%", padding: "3%", backgroundColor: "#e3eefc" }}>

                <Box sx={{ textAlign: "center", marginBottom: "5%" }}>

                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: "center", marginBottom: "3%",
                            fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem"
                        }}
                    >
                        Product Details</Typography>

                    <Box sx={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, width: '100%',
                        marginTop: '5%', marginBottom: '5%'
                    }}>
                        <Box sx={{
                            marginRight: '1.5%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', flex: '0 0 35%', width: '35%'
                        }}>
                            <Avatar
                                alt={name}
                                src={image.filepreview}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    margin: "auto",
                                    marginBottom: "3%",
                                    backgroundColor: "#3f51b5"
                                }}
                            >
                                {name}
                            </Avatar>
                        </Box>

                        <Box sx={{
                            marginLeft: '1.5%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'left', flex: '0 0 65%', width: '65%'
                        }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: "left", marginBottom: "5%",
                                }}
                            >
                                {name}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: "left", marginBottom: "3%",
                                }}
                            >
                                Serial Number: {serialNumber}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: "left", marginBottom: "3%",
                                }}
                            >
                                Description: {description}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: "left", marginBottom: "3%",
                                }}
                            >
                                Brand: {brand}
                            </Typography>
                        </Box>
                    </Box>

                    <Timeline sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2,
                        },
                    }}>
                        {getHistory()}
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                {dayjs().format('HH:mm a')} {dayjs().format('MM/DD/YYYY')}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography>IsSold: {isSold.toString()}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>



                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ width: "50%", marginTop: "3%", backgroundColor: '#98b5d5', '&:hover': { backgroundColor: '#618dbd' } }}
                        onClick={handleSubmit}
                    >
                        Update Product
                    </Button>

                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <Button
                            onClick={handleBack}
                            sx={{
                                marginTop: "5%",
                            }}
                        >
                            Back
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default UpdateProduct;
