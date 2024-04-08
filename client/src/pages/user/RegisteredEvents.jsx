import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button, CircularProgress, Modal, Box } from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom'

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrCodeData, setQrCodeData] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const api = useAxiosPrivate();
  const [qrId, setQrId] = useState('')
  const nav = useNavigate()


  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get('/api/user/get-my-registrations');
        const data = response.data;
        if (data.success) {
          setRegistrations(data.registrations || []);
        } else {
          setError(data.message || 'Failed to fetch registrations');
        }
      } catch (error) {
        setError('Failed to fetch registrations');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleOpenQR = (qrCode) => {
    setQrCodeData(qrCode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const HandleScanQr = async (qrCodeImage) => {
    await api.post('/api/user/scan-my-qr', { qrImage: qrCodeImage })
      .then(({ data }) => {
        nav(`/user${data.secretPageUrl}`)

      })
      .catch((error) => {
        console.log(error)
        setError(error.message)
      })
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        My Registrations
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : registrations.length === 0 ? (
        <Typography>No registrations found</Typography>
      ) : (
        <Grid container spacing={2}>
          {registrations.map((registration) => (
            <Grid minWidth={'400px'} item xs={12} key={registration._id}>
              <Paper style={{ padding: '20px', position: 'relative' }}>
                <div>
                  <Typography variant="h6">{registration.name}</Typography>
                  <Typography variant="body1">{registration.description}</Typography>
                </div>
                {registration.verified ? (
                  <Typography width={'max-content'} variant="body1" bgcolor={'green'} color="white">Attended</Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1 }} 
                    onClick={() => { handleOpenQR(registration.qrCode); setQrId(registration._id) }}
                  >
                    Open QR
                  </Button>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            p: 4,
          }}
        >
          <img src={qrCodeData} alt="QR Code" style={{ maxWidth: '100%' }} />
          <Button onClick={() => { HandleScanQr(qrId) }}>Scan QR</Button>

        </Box>
      </Modal>
    </div>
  );
};

export default Registrations;
