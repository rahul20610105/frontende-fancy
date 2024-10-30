import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
  TextField,
  Snackbar,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Phone, Email, LocationOn, LinkedIn, Twitter, Facebook } from '@mui/icons-material';

// Styled components
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  borderRadius: '25px',
  padding: '10px 20px',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  padding: theme.spacing(3),
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Contact = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        const jobsData = Array.isArray(response.data) ? response.data : [];
        setJobs(jobsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch job listings');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 9, mb: 4 }}>
      <Typography
        variant="h2"
        gutterBottom
        align="center"
        sx={{ fontFamily: 'Playfair Display, serif', color: 'primary.main', mb: 6 }}
      >
        Get in Touch
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', color: 'primary.main' }}>
                Send Us a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Name" margin="normal" required />
                <TextField fullWidth label="Email" margin="normal" required type="email" />
                <TextField fullWidth label="Subject" margin="normal" required />
                <TextField fullWidth label="Message" margin="normal" required multiline rows={4} />
                <StyledButton type="submit" variant="contained" sx={{ mt: 2 }}>
                  Send Message
                </StyledButton>
              </form>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', color: 'primary.main' }}>
                Contact Information
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Phone color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">(123) 456-7890</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Email color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">support@ecommercecompany.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <LocationOn color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">123 E-commerce St, City, Country</Typography>
              </Box>
              <Box mt={3}>
                <SocialButton aria-label="linkedin">
                  <LinkedIn />
                </SocialButton>
                <SocialButton aria-label="twitter">
                  <Twitter />
                </SocialButton>
                <SocialButton aria-label="facebook">
                  <Facebook />
                </SocialButton>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Map */}
      <Box sx={{ my: 6 }}>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', color: 'primary.main' }}>
              Our Location
            </Typography>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.999724252603!2d-122.0838496850179!3d37.42199997982567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba74f2c4c1d3%3A0x45cc15aa8d26d8ed!2sGoogleplex!5e0!3m2!1sen!2sus!4v1639079061778!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              title="Company Location"
            />
          </CardContent>
        </StyledCard>
      </Box>

      {/* Job Listings Section */}
      <Box sx={{ my: 6 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontFamily: 'Playfair Display, serif', color: 'primary.main', mb: 4 }}
        >
          Join Our Team
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {jobs.length === 0 ? (
              <Typography align="center" sx={{ width: '100%' }}>
                No job openings available at the moment.
              </Typography>
            ) : (
              jobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} key={job.id}>
                  <StyledCard>
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          mb: 2,
                          color: 'primary.main',
                        }}
                      >
                        {job.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: 'Roboto, sans-serif', mb: 3, color: 'text.secondary' }}
                      >
                        {job.description}
                      </Typography>
                      <StyledButton variant="contained" fullWidth>
                        Apply Now
                      </StyledButton>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Message sent successfully!"
      />
    </Container>
  );
};

export default Contact;