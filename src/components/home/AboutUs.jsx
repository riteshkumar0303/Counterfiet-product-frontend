import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const teamMembers = [
  {
    name: "Dr. Amit Kumar",
    role: "Assistant Professor, Department of Information Technology, REC Ambedkarnagar",
    description:
      "An accomplished academic with a focus on research and development in the field of Information Technology. Passionate about mentoring students and fostering innovation.",
    image: "/images/Amitsir.jpg",
  },
  {
    name: "Anurag Chaurasia",
    role: "React Developer",
    description:
      "Skilled in building modern and performant front-end applications with React.js. Focused on clean code and great user experience.",
    image: "/images/Anurag.jpg",
    github: "https://github.com/anuragji8299",
    linkedin: "https://linkedin.com/in/anurag-chaurasia-71697b241",
    twitter: "https://twitter.com/anuragchaurasia",
    instagram: "https://www.instagram.com/anurag_chaurasia8299/?hl=en",
    resume: "/resume/anurag_resume.pdf",
  },
  {
    name: "Hritik Kanaujiya",
    role: "Frontend Developer",
    description:
      "Loves crafting responsive and dynamic UIs with React.js. Focused on user-friendly and clean design principles.",
    image: "/images/Hritik.jpeg",
    github: "https://github.com/hritikkanaujiya",
    linkedin: "https://linkedin.com/in/hritikkanaujiya",
    twitter: "https://twitter.com/hritikkanaujiya",
    instagram: "https://instagram.com/hritikkanaujiya",
    resume: "/resume/hritik_resume.pdf",
  },
  {
    name: "Ritesh Kumar",
    role: "Backend & Security Specialist",
    description:
      "Focused on backend development, API integrations, and implementing robust security practices across systems.",
    image: "/images/ritesh.jpeg",
    github: "https://github.com/riteshkumar",
    linkedin: "https://linkedin.com/in/riteshkumar",
    twitter: "https://twitter.com/riteshkumar",
    instagram: "https://instagram.com/riteshkumar",
    resume: "https://drive.google.com/file/d/1cMDdAhPpGZUAxaA8KiOWxvw7YScZwbmH/view?usp=drivesdk",
  },
];

const Card = ({ member, isMentor = false }) => (
  <div
    style={{
      background: "#ffffff",
      borderRadius: "20px",
      padding: "25px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      position: "relative",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.15)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.1)";
    }}
  >
    <div style={{ marginBottom: "20px" }}>
      <img
        src={member.image}
        alt={member.name}
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid #a5b4fc",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
    <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1f2937" }}>{member.name}</h2>
    <h3 style={{ fontSize: "16px", color: "#6b7280", marginBottom: "10px" }}>{member.role}</h3>
    <p style={{ fontSize: "14px", color: "#374151", marginBottom: "20px" }}>{member.description}</p>

    {!isMentor && (
      <>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
          <a href={member.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: "22px", color: "#000" }}>
            <FaGithub />
          </a>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: "22px", color: "#0A66C2" }}>
            <FaLinkedin />
          </a>
          <a href={member.twitter} target="_blank" rel="noopener noreferrer" style={{ fontSize: "22px", color: "#1DA1F2" }}>
            <FaTwitter />
          </a>
          <a href={member.instagram} target="_blank" rel="noopener noreferrer" style={{ fontSize: "22px", color: "#E4405F" }}>
            <FaInstagram />
          </a>
        </div>
        <a
          href={member.resume}
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "#6366f1",
            color: "#fff",
            borderRadius: "999px",
            textDecoration: "none",
            fontWeight: "500",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#4f46e5")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#6366f1")}
        >
          <FiDownload />
          Download Resume
        </a>
      </>
    )}
  </div>
);

const AboutUs = () => {
  const mentor = teamMembers[0];
  const coreMembers = teamMembers.slice(1);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(to bottom right, #e0f2fe, #f3e8ff)",
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
        Meet Our Team
      </h1>

      {/* Team Mentor Section */}
      <h2 style={{ fontSize: "28px", marginBottom: "15px", textAlign: "center", color: "#4b5563" }}>
        Team Mentor
      </h2>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
        <Card member={mentor} isMentor />
      </div>

      {/* Core Team Section */}
      <h2 style={{ fontSize: "28px", marginBottom: "20px", textAlign: "center", color: "#4b5563" }}>
        Core Team
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >
        {coreMembers.map((member, index) => (
          <Card key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
