import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animation for the button
const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease-in-out;
  &:focus {
    border-color: #4fc3f7;
    outline: none;
  }
  resize: vertical; // Allows vertical resizing
`;

const FileInput = styled.input`
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #4fc3f7;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4fc3f7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease-out;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #039be5;
  }
`;

const Report = () => {
  const [formData, setFormData] = useState({
    name: '',
    activity: '',
    place: '',
    date: '',
    participants: '',
    faculty: '',
    coordinater: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    // Handling file input separately
    setFormData((prevFormData) => ({
      ...prevFormData,
      banner: e.target.files[0], // Assuming single file upload
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = ['name', 'email', 'domain', 'phone', 'qualification', 'date', 'country', 'description'];
    const allFieldsFilled = requiredFields.every(field => formData[field] && formData[field].trim() !== '');

    if (!allFieldsFilled) {
        alert('Please fill out all required fields.');
        return; // Stop the submission process
    }

    // Form data for the POST request
    const formBody = new FormData();
    for (const field in formData) {
        formBody.append(field, formData[field]);
    }

    try {
        const response = await fetch('/api/admin/create-event', {
            method: 'POST',
            body: formBody,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const result = await response.json();
        console.log(result);
        alert('Event created successfully!');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Error creating event. Please try again.');
    }
};


  return (
    <Container>
      <h2>Report Event</h2>
      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Event Name" onChange={handleChange} value={formData.name} />
        <Input name="activity" placeholder="Type of Activity" onChange={handleChange} value={formData.activity}/>
        <Input name="place" placeholder="Place of Activity" onChange={handleChange} value={formData.place} />
        <Input name="participants" placeholder="Number of Participants" onChange={handleChange} value={formData.participants} />
        <Input name="date" placeholder="Date" onChange={handleChange} value={formData.date} type="date" />
        <Input name="faculty" placeholder="Name of Faculty" onChange={handleChange} value={formData.faculty} />
        <Input name="coordinater" placeholder="Name of Coordinater" onChange={handleChange} value={formData.coordinater} />
        <TextArea name="description" placeholder="Event Description" rows="4" onChange={handleChange} value={formData.description} />
        <FileInput type="file" onChange={handleFileChange} />
        <Button type="submit">Submit report</Button>
      </Form>
    </Container>
  );
};

export default Report;