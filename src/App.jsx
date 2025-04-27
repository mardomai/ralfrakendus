import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Button, Container } from '@mui/material';
import WeatherPage from './pages/WeatherPage';
import MapMarkersPage from './pages/MapMarkersPage';
import BlogPage from './pages/BlogPage';
import ShopPage from './pages/ShopPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Ilm
            </Button>
            <Button color="inherit" component={Link} to="/map">
              Kaart
            </Button>
            <Button color="inherit" component={Link} to="/blog">
              Blogi
            </Button>
            <Button color="inherit" component={Link} to="/shop">
              E-pood
            </Button>
            <Button color="inherit" component={Link} to="/favorites">
              Lemmikud
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<WeatherPage />} />
            <Route path="/map" element={<MapMarkersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App; 