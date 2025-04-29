import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

let cache = {
  data: null,
  timestamp: null,
  ttl: 5 * 60 * 1000
};

function FavoritesPage() {
  const [items, setItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    rating: 0,
  });
  const [limit, setLimit] = useState(10);

  const fetchItems = () => {
    if (cache.data && cache.timestamp && (Date.now() - cache.timestamp < cache.ttl)) {
      setItems(cache.data.slice(0, limit));
      return;
    }

    const data = [];  // Initialize with empty array instead of premade items

    cache.data = data;
    cache.timestamp = Date.now();

    setItems(data.slice(0, limit));
  };

  useEffect(() => {
    fetchItems();
  }, [limit]);

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.image || !formData.category) {
      setSnackbar({
        open: true,
        message: 'Palun täitke kõik väljad',
        severity: 'error'
      });
      return;
    }

    const newItem = {
      id: items.length + 1,
      ...formData,
      timestamp: new Date().toISOString()
    };

    cache.data = cache.data ? [newItem, ...cache.data] : [newItem];
    cache.timestamp = Date.now();
    
    setItems(prevItems => [newItem, ...prevItems].slice(0, limit));
    setDialogOpen(false);
    setFormData({
      title: '',
      description: '',
      image: '',
      category: '',
      rating: 0,
    });

    setSnackbar({
      open: true,
      message: 'Seade edukalt lisatud!',
      severity: 'success'
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lemmikseadmed
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setDialogOpen(true)}
        >
          Lisa uus seade
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Näita seadmeid</InputLabel>
          <Select
            value={limit}
            label="Näita seadmeid"
            onChange={(e) => setLimit(e.target.value)}
          >
            <MenuItem value={5}>5 seadet</MenuItem>
            <MenuItem value={10}>10 seadet</MenuItem>
            <MenuItem value={20}>20 seadet</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {item.description}
                </Typography>
                <Typography variant="body2" color="primary">
                  Kategooria: {item.category}
                </Typography>
                <Rating value={item.rating} readOnly sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Lisa uus seade</DialogTitle>
        <DialogContent>
          <TextField
            label="Nimetus"
            fullWidth
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            label="Kirjeldus"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            label="Pildi URL"
            fullWidth
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Kategooria</InputLabel>
            <Select
              value={formData.category}
              label="Kategooria"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <MenuItem value="Arvutid">Arvutid</MenuItem>
              <MenuItem value="Telefonid">Telefonid</MenuItem>
              <MenuItem value="Lisaseadmed">Lisaseadmed</MenuItem>
              <MenuItem value="Audio">Audio</MenuItem>
              <MenuItem value="Fotoseadmed">Fotoseadmed</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Typography component="legend">Hinnang</Typography>
            <Rating
              value={formData.rating}
              onChange={(event, newValue) => {
                setFormData({ ...formData, rating: newValue });
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Tühista</Button>
          <Button onClick={handleSubmit} variant="contained">
            Lisa
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FavoritesPage; 