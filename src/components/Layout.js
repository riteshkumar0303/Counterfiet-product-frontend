import { Outlet, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
    const contactRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const scrollToContact = () => {
        const footer = document.getElementById("footer");
        if (footer) {
            footer.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            contactRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <main className="App">
            <Navbar onContactClick={scrollToContact} />
            <Outlet />
            {location.pathname !== "/scanner" && (
                <>
                    <Footer ref={contactRef} />
                    <ScrollToTop />
                </>
            )}
        </main>
    );
};

export default Layout;


