import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapMarkersPage() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMarker, setNewMarker] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchMarkers = () => { 
    const mockMarkers = [];
    setMarkers(mockMarkers);
  };

  const saveMarker = async (marker) => {
    const now = new Date().toISOString();
    const newMarker = {
      id: markers.length + 1,
      name: marker.name || '',
      latitude: marker.latitude || 0,
      longitude: marker.longitude || 0,
      description: marker.description || '',
      added: now,
      edited: now,
    };
    setMarkers([...markers, newMarker]);
  };

  const updateMarker = async (marker) => {
    const updatedMarkers = markers.map((m) =>
      m.id === marker.id ? { ...marker, edited: new Date().toISOString() } : m
    );
    setMarkers(updatedMarkers);
  };

  const deleteMarker = async (id) => {
    const updatedMarkers = markers.filter((m) => m.id !== id);
    setMarkers(updatedMarkers);
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        setNewMarker({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
        setIsEditing(false);
        setIsDialogOpen(true);
      },
    });
    return null;
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedMarker(null);
    setNewMarker({});
  };

  const handleSave = () => {
    if (isEditing && selectedMarker) {
      updateMarker({ ...selectedMarker, ...newMarker });
    } else {
      saveMarker(newMarker);
    }
    handleDialogClose();
  };

  const handleEdit = (marker) => {
    setSelectedMarker(marker);
    setNewMarker(marker);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Kaart
      </Typography>
      
      <Box sx={{ height: '500px', mb: 4 }}>
        <MapContainer
          center={[58.378025, 26.728493]} 
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapEvents />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.latitude, marker.longitude]}
            >
              <Popup>
                <Typography variant="subtitle1">{marker.name}</Typography>
                <Typography variant="body2">{marker.description}</Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>

      <List>
        {markers.map((marker) => (
          <ListItem key={marker.id}>
            <ListItemText
              primary={marker.name}
              secondary={`${marker.description} (${marker.latitude}, ${marker.longitude})`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleEdit(marker)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => deleteMarker(marker.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{isEditing ? 'Edit Marker' : 'New Marker'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nimi"
            fullWidth
            value={newMarker.name || ''}
            onChange={(e) => setNewMarker({ ...newMarker, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Kirjeldus"
            fullWidth
            multiline
            rows={4}
            value={newMarker.description || ''}
            onChange={(e) => setNewMarker({ ...newMarker, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Laiuskraad"
            fullWidth
            disabled
            value={newMarker.latitude || ''}
          />
          <TextField
            margin="dense"
            label="Pikkuskraad"
            fullWidth
            disabled
            value={newMarker.longitude || ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MapMarkersPage; 