import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Button, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { Image } from 'cloudinary-react';
import { toast } from 'react-hot-toast'
import useAxiosPrivate from '@hooks/useAxiosPrivate'
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';


const CreateClubForm = () => {
  const [clubName, setClubName] = useState('');
  const [clubImages, setClubImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const api = useAxiosPrivate()
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalClubs, setTotalClubs] = useState(0)
  const [info, setInfo] = useState({})

  const handleNameChange = (event) => {
    setClubName(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const remainingSlots = 4 - clubImages.length;

    if (files.length > remainingSlots) {
      const selectedImages = files.slice(0, remainingSlots);
      setClubImages([...clubImages, ...selectedImages]);
    } else {
      setClubImages([...clubImages, ...files]);
    }
  };


  const handleSubmit = async () => {
    if (clubName === '') {
      toast.error("Please provide a club name");
      return;
    }

    const imageUrls = []; // Array to store uploaded image URLs

    try {
      setUploading(true);

      // Iterate over each image in clubImages
      for (let i = 0; i < clubImages.length; i++) {
        const formData = new FormData();
        formData.append('file', clubImages[i]); // Append current image
        formData.append('upload_preset', 'oxf8rttq');

        // Upload current image
        const response = await fetch('https://api.cloudinary.com/v1_1/doozsaybm/image/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Uploaded image:', data.url);
          imageUrls.push(data.url);
        } else {
          console.error('Failed to upload image');
        }
      }

      console.log('Uploaded images:', imageUrls);

      const clubData = {
        club_name: clubName,
        club_images: imageUrls
      };

      const { data } = await api.post('/api/admin/create-club', clubData)
      if (data.success) {
        toast.success('Club created successfully');
        setClubName('');
        setClubImages([]);
      }
      else {
        toast.error('Something went wrong');
        setClubName('');
        setClubImages([]);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };


  useEffect(() => {
    fetchItems(page);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const fetchItems = async () => {
    try {
      const response = await api.get(`/api/admin/clubs/${activePage}`)
        .then(({ data }) => {
          setActivePage(activePage + 1);
          setTotalClubs(data.totalClubs)
          setItems(data.clubs)
        })
        .catch((error) => {
          setInfo(null);
          console.error(error);
        });
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchMoreData = useCallback(() => {
    try {
      api.get(`/api/admin/clubs/${activePage}`)
        .then(({ data }) => {
          setActivePage(activePage + 1);
          setItems(prevItems => [...prevItems, ...data.posts]);
          setPage(page + 1);
        })
        .catch((error) => {
          setInfo(null);
          console.error(error);
        });

    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, [items.length, activePage, totalClubs])

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create New Club
      </Typography>
      <TextField
        fullWidth
        label="Club Name"
        variant="outlined"
        value={clubName}
        onChange={handleNameChange}
        sx={{ mb: 2 }}
      />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: 'none', width: '0px', height: '0px' }}
        id="club-images"
      />
      <label htmlFor="club-images">
        <Button variant="contained" component="span" sx={{ mb: 2 }}>
          Upload Club Images (Max 4)
        </Button>
      </label>
      <Grid container spacing={2}>
        {clubImages.map((image, index) => (
          <Grid item key={index}>
            <img src={URL.createObjectURL(image)} alt={`Club Image ${index}`} style={{ width: 200, height: 200, objectFit: 'cover' }} />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={handleSubmit} disabled={uploading} sx={{ mt: 2 }}>
        {uploading ? 'Uploading...' : 'Create Club'}
      </Button>

      {/* Display the message below the form */}
      <Box sx={{ mt: 2 }}>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={items.length < totalClubs}
          loader={<Typography>Loading...</Typography>}
          endMessage={<Typography>No more items to load</Typography>}
          horizontal
        >
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {
                items.map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={item.id}>
                    <Card sx={{ maxWidth: 345, mx: "auto" }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.club_images[0]}
                        alt={`${item.name} Banner`}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" textAlign="center">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                          Participants: {item.participants}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                          <Button variant="contained" color="primary">
                            Join
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </Box>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default CreateClubForm;
