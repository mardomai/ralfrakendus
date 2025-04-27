import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';

const initialPosts = [
  {
    id: 1,
    title: 'Esimene blogipostitus',
    description: 'See on esimese blogipostituse sisu.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    comments: [],
  },
];

function BlogPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [comment, setComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleOpenDialog = (post = null) => {
    if (post) {
      setFormData({ title: post.title, description: post.description });
      setCurrentPost(post);
    } else {
      setFormData({ title: '', description: '' });
      setCurrentPost(null);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({ title: '', description: '' });
    setCurrentPost(null);
  };

  const handleSubmit = () => {
    if (currentPost) {
      setPosts(posts.map(post =>
        post.id === currentPost.id
          ? {
            ...post,
            title: formData.title,
            description: formData.description,
            updated_at: new Date().toISOString(),
          }
          : post
      ));
    } else {
      const newPost = {
        id: posts.length + 1,
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        comments: [],
      };
      setPosts([...posts, newPost]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleOpenCommentDialog = (postId) => {
    setSelectedPostId(postId);
    setCommentDialogOpen(true);
  };

  const handleCloseCommentDialog = () => {
    setCommentDialogOpen(false);
    setComment('');
    setSelectedPostId(null);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;

    setPosts(posts.map(post =>
      post.id === selectedPostId
        ? {
          ...post,
          comments: [...post.comments, {
            id: post.comments.length + 1,
            text: comment,
            created_at: new Date().toISOString(),
          }],
        }
        : post
    ));
    handleCloseCommentDialog();
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
          ...post,
          comments: post.comments.filter(comment => comment.id !== commentId),
        }
        : post
    ));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Blogi ja Kommentaaride haldus
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
        sx={{ mb: 3 }}
      >
        Lisa uus postitus
      </Button>

      <List>
        {posts.map((post) => (
          <Paper key={post.id} elevation={3} sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
              {post.description}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Loodud: {new Date(post.created_at).toLocaleDateString()}
              {post.updated_at !== post.created_at && 
                ` | Muudetud: ${new Date(post.updated_at).toLocaleDateString()}`}
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <Button
                startIcon={<EditIcon />}
                onClick={() => handleOpenDialog(post)}
                size="small"
              >
                Muuda
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(post.id)}
                color="error"
                size="small"
                sx={{ ml: 1 }}
              >
                Kustuta
              </Button>
              <Button
                startIcon={<CommentIcon />}
                onClick={() => handleOpenCommentDialog(post.id)}
                color="primary"
                size="small"
                sx={{ ml: 1 }}
              >
                Lisa kommentaar
              </Button>
            </Box>

            {post.comments.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Kommentaarid:
                </Typography>
                <List dense>
                  {post.comments.map((comment) => (
                    <ListItem key={comment.id}>
                      <ListItemText
                        primary={comment.text}
                        secondary={new Date(comment.created_at).toLocaleDateString()}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteComment(post.id, comment.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Paper>
        ))}
      </List>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentPost ? 'Muuda postitust' : 'Lisa uus postitus'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Pealkiri"
            fullWidth
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Sisu"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Tühista</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {currentPost ? 'Salvesta' : 'Lisa'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={commentDialogOpen} onClose={handleCloseCommentDialog}>
        <DialogTitle>Lisa kommentaar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Kommentaar"
            fullWidth
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCommentDialog}>Tühista</Button>
          <Button onClick={handleAddComment} variant="contained" color="primary">
            Lisa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BlogPage; 