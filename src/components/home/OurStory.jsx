import React from "react";

const OurStory = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "40px 20px",
                background: "linear-gradient(to bottom right, #e0f2fe, #f3e8ff)",
                paddingTop: "100px"
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "36px",
                    fontWeight: "bold",
                    marginBottom: "40px",
                    color: "#1f2937",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
            >
                Our Story
            </h1>

            {/* Origin Story Section */}
            <div
                style={{
                    maxWidth: "800px",
                    margin: "0 auto 60px auto",
                    padding: "40px",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                    color: "#4b5563",
                    lineHeight: "1.8",
                    fontSize: "16px",
                }}
            >
                <p style={{ marginBottom: "20px" }}>
                    We are three friends—<strong>Hritik, Anurag, and Ritesh</strong>—collegemates who found ourselves at a crossroads during our third year. Tasked with a major project for our university curriculum, we spent days brainstorming and debating various real-world problems. Inspiration initially struck from a senior at another college who had built a successful blockchain project, sparking our interest in the technology.
                </p>
                <p>
                    The true turning point, however, was a personal experience. One of us ordered a pair of Red Tape sports shoes online, but upon arrival, doubt set in. Despite the premium price tag, there was no sure way to verify if the shoes were genuine. Calls to customer care—both the marketplace’s and the brand’s—left us without answers. We realized a critical gap existed: <strong>consumers had no reliable way to distinguish fake products from real ones</strong>. Driven by this problem, we decided to build a secure, blockchain-based platform to guarantee product authenticity.
                </p>
            </div>
        </div>
    );
};

export default OurStory;
