import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import {
  VerifiedUser,
  QrCodeScanner,
  LockOutlined,
  AnalyticsOutlined,
  AccountBalanceWallet,
} from "@mui/icons-material";

const FeatureCard = ({ icon, title, description }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      height: "100%",
      background: "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(10px)",
      border: "1px solid #e0e0e0",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
      },
    }}
  >
    <Box sx={{ color: "primary.main", mb: 2 }}>{icon}</Box>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Paper>
);

const AboutUs = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="overline"
            sx={{ fontWeight: "bold", letterSpacing: 2, color: "primary.main" }}
          >
            The Future of Authenticity
          </Typography>
          <Typography
            variant="h2"
            fontWeight="900"
            gutterBottom
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              background: "linear-gradient(45deg, #1976d2, #9c27b0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About UltraReal
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: "700px", mx: "auto", fontWeight: 400 }}
          >
            We leverage blockchain and NFT technology to create a world without
            counterfeits.
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="center">
          {/* Left Side: Story */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Securing Every Step
                </Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                  Counterfeit products cause financial loss to brands and pose
                  serious risks to consumers. <strong>UltraReal</strong> addresses
                  this by registering every genuine product on the blockchain as
                  a unique NFT.
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 2, alignItems: "start" }}>
                <Avatar sx={{ bgcolor: "primary.light" }}>
                  <QrCodeScanner />
                </Avatar>
                <Box>
                  <Typography fontWeight="bold">Scan & Verify</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Instantly verify products using our unique QR system. No more
                    guessing about originality.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, alignItems: "start" }}>
                <Avatar sx={{ bgcolor: "secondary.light" }}>
                  <LockOutlined />
                </Avatar>
                <Box>
                  <Typography fontWeight="bold">Immutable Trust</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Since blockchain data is tamper-proof, counterfeiters cannot
                    replicate or manipulate product identities.
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>

          {/* Right Side: Visual Element/Card Grid */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FeatureCard
                  icon={<VerifiedUser fontSize="large" />}
                  title="Anti-Fake"
                  description="Complete elimination of counterfeit items in your supply chain."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FeatureCard
                  icon={<AnalyticsOutlined fontSize="large" />}
                  title="Transparency"
                  description="Full lifecycle tracking of products from factory to consumer."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FeatureCard
                  icon={<AccountBalanceWallet fontSize="large" />}
                  title="NFT Based"
                  description="Digital ownership certificates for every physical item sold."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FeatureCard
                  icon={<QrCodeScanner fontSize="large" />}
                  title="Instant"
                  description="Verification happens in seconds with a simple smartphone scan."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 8 }} />

        <Box textAlign="center">
          <Typography variant="body1" color="text.secondary" italic>
            "UltraReal aims to build a secure and trust-driven marketplace where
            originality, transparency, and authenticity come first."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;