import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Badge,
  Snackbar,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Sülearvuti Pro X',
    price: 999.99,
    description: 'Võimas sülearvuti professionaalidele',
    image: 'https://picsum.photos/300/200?random=1',
    stock: 10
  },
  {
    id: 2,
    name: 'Nutitelefon Y20',
    price: 599.99,
    description: 'Tipptasemel nutitelefon suurepärase kaameraga',
    image: 'https://picsum.photos/300/200?random=2',
    stock: 15
  },
  {
    id: 3,
    name: 'Juhtmevabad Kõrvaklapid',
    price: 149.99,
    description: 'Kvaliteetne heli ja mürasummutus',
    image: 'https://picsum.photos/300/200?random=3',
    stock: 20
  },
  {
    id: 4,
    name: 'Nutikas Käekell',
    price: 199.99,
    description: 'Tervise ja aktiivsuse jälgimiseks',
    image: 'https://picsum.photos/300/200?random=4',
    stock: 8
  },
  {
    id: 5,
    name: 'Tahvelarvuti Air',
    price: 449.99,
    description: 'Õhuke ja kerge tahvelarvuti',
    image: 'https://picsum.photos/300/200?random=5',
    stock: 12
  },
  {
    id: 6,
    name: 'Mänguri Hiir',
    price: 79.99,
    description: 'Täpne ja ergonoomiline mänguhiir',
    image: 'https://picsum.photos/300/200?random=6',
    stock: 25
  },
  {
    id: 7,
    name: 'Mehaaniline Klaviatuur',
    price: 129.99,
    description: 'RGB valgustusega mänguri klaviatuur',
    image: 'https://picsum.photos/300/200?random=7',
    stock: 15
  },
  {
    id: 8,
    name: 'Veekindel Kõlar',
    price: 89.99,
    description: 'Kaasaskantav Bluetooth kõlar',
    image: 'https://picsum.photos/300/200?random=8',
    stock: 18
  },
  {
    id: 9,
    name: 'Kaamera Statiiv',
    price: 59.99,
    description: 'Professionaalne fotograafia statiiv',
    image: 'https://picsum.photos/300/200?random=9',
    stock: 22
  }
];

function ShopPage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showSnackbar('Toode lisatud ostukorvi', 'success');
  };

  const removeFromCart = (productId) => {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.id !== productId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
    showSnackbar('Toode eemaldatud ostukorvist', 'info');
  };

  const deleteFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    showSnackbar('Toode kustutatud ostukorvist', 'info');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (!formData.name || !formData.email || !formData.address) {
      showSnackbar('Palun täitke kõik väljad', 'error');
      return;
    }
    setCart([]);
    setIsCheckoutOpen(false);
    showSnackbar('Tellimus edukalt esitatud!', 'success');
    localStorage.removeItem('cart');
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">E-pood</Typography>
        <IconButton
          color="primary"
          onClick={() => setIsCartOpen(true)}
          sx={{ position: 'relative' }}
        >
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  €{product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Laos: {product.stock}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => addToCart(product)}
                  sx={{ mt: 2 }}
                >
                  Lisa ostukorvi
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={isCartOpen} onClose={() => setIsCartOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Ostukorv</DialogTitle>
        <DialogContent>
          {cart.length === 0 ? (
            <Typography>Ostukorv on tühi</Typography>
          ) : (
            <List>
              {cart.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                    secondary={`€${item.price.toFixed(2)} x ${item.quantity}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => removeFromCart(item.id)}>
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={() => addToCart(item)}>
                      <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
          {cart.length > 0 && (
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6">
                Kokku: €{calculateTotal().toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                sx={{ mt: 2 }}
              >
                Vormista tellimus
              </Button>
            </Paper>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Vormista tellimus</DialogTitle>
        <DialogContent>
          <TextField
            label="Nimi"
            fullWidth
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="E-post"
            fullWidth
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Aadress"
            fullWidth
            multiline
            rows={3}
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCheckoutOpen(false)}>Tühista</Button>
          <Button variant="contained" onClick={handleCheckout}>
            Esita tellimus
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ShopPage; 