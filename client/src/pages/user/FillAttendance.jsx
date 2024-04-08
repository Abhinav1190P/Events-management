import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom'

export default function FillAttendance() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams()
    const api = useAxiosPrivate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/user/verify-attendance', { token, password });
            if (response.data.success) {
                setMessage(response.data.message);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>
            <Box maxWidth={'300px'}>
                <Typography variant="h4">Fill Attendance</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
                {message && <Typography variant="body1">{message}</Typography>}
            </Box>
        </div>
    );
}
