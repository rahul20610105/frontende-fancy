import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LinkedIn, Twitter } from '@mui/icons-material';

const teamMembers = [
    {
        name: "Alice Johnson",
        role: "Product Manager",
        imageUrl: "/api/placeholder/150/150",
        description: "Alice leads our product strategy with 10+ years of e-commerce expertise.",
        linkedin: "https://linkedin.com/in/alice-johnson",
        twitter: "https://twitter.com/alicejohnson"
    },
    {
        name: "Bob Smith",
        role: "Frontend Developer",
        imageUrl: "/api/placeholder/150/150",
        description: "Bob crafts seamless user experiences for our online store.",
        linkedin: "https://linkedin.com/in/bob-smith",
        twitter: "https://twitter.com/bobsmith"
    },
    {
        name: "Charlie Brown",
        role: "UI/UX Designer",
        imageUrl: "/api/placeholder/150/150",
        description: "Charlie designs intuitive interfaces that enhance our customers' shopping journey.",
        linkedin: "https://linkedin.com/in/charlie-brown",
        twitter: "https://twitter.com/charliebrown"
    },
    {
        name: "Diana Prince",
        role: "Marketing Specialist",
        imageUrl: "/api/placeholder/150/150",
        description: "Diana drives engagement and growth through innovative marketing strategies.",
        linkedin: "https://linkedin.com/in/diana-prince",
        twitter: "https://twitter.com/dianaprince"
    },
];

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: theme.shadows[10],
    },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto',
    border: `4px solid ${theme.palette.primary.main}`,
}));

const SocialIcon = styled('a')(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
    transition: 'color 0.2s',
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

const TeamPage = () => {
    return (
        <Box sx={{ 
            bgcolor: 'background.default', 
            minHeight: '100vh',
            py: 8,
            backgroundImage: 'linear-gradient(to right bottom, #f3e5f5, #e8eaf6)',
        }}>
            <Container maxWidth="lg">
                <Typography variant="h2" align="center" gutterBottom sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 6,
                    fontFamily: "'Playfair Display', serif",
                }}>
                    Meet Our E-commerce Experts
                </Typography>
                <Grid container spacing={4}>
                    {teamMembers.map((member) => (
                        <Grid item xs={12} sm={6} md={3} key={member.name}>
                            <StyledCard>
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <StyledAvatar src={member.imageUrl} alt={member.name} />
                                    <Typography variant="h5" component="h2" sx={{ mt: 2, mb: 1, fontWeight: 600, color: 'primary.main' }}>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                        {member.role}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                                        {member.description}
                                    </Typography>
                                    <Box>
                                        <SocialIcon href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                            <LinkedIn />
                                        </SocialIcon>
                                        <SocialIcon href={member.twitter} target="_blank" rel="noopener noreferrer">
                                            <Twitter />
                                        </SocialIcon>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default TeamPage;