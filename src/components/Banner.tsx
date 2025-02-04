import { Box, Typography } from '@mui/material';

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(/asian-food-restaurant.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '250px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ position: 'relative', zIndex: 2 }}>
        Optimized Your Meal
      </Typography>
      <Typography variant="body1" sx={{ position: 'relative', zIndex: 2 }}>
        Select Meal to Add in Week. You will be able to edit, modify and change the Meal Weeks.
      </Typography>
    </Box>
  );
};

export default Banner;
