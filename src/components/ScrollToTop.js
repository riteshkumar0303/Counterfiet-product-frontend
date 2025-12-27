import { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';

const ScrollToTop = () => {
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setTrigger(true);
            } else {
                setTrigger(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const StyledFab = styled(Fab)(({ theme }) => ({
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
        zIndex: 1000,
    }));

    return (
        <Zoom in={trigger}>
            <StyledFab
                color="primary"
                size="small"
                aria-label="scroll back to top"
                onClick={handleClick}
            >
                <KeyboardArrowUpIcon />
            </StyledFab>
        </Zoom>
    );
};

export default ScrollToTop;
