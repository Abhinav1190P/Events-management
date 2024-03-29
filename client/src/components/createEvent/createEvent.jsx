import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import useAxiosPrivate from "@hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import axios from "axios";
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

const CreateEventSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    club: "",
    time: "",
    venue: "",
    date: "",
    description: "",
    banner: null,
  });
  const api = useAxiosPrivate();

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
  const [isUploadingImage, setIsUploadingImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('hey')
    const requiredFields = [
      "name",
      "club",
      "time",
      "venue",
      "date",
      "description",
    ];
    const allFieldsFilled = requiredFields.every(
      (field) => formData[field] && formData[field].trim() !== ""
    );

    if (!allFieldsFilled) {
      toast.error("Please fill out all required fields.");
      return;
    }
    setIsUploadingImage(true)
    const formData2 = new FormData();
    formData2.append("file", formData.banner);
    formData2.append("upload_preset", "oxf8rttq");

    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/doozsaybm/upload",
      formData2
    );
    setIsUploadingImage(false)
    let obj = {
      name: formData.name,
      club: formData.club,
      time: formData.time,
      venue: formData.venue,
      date: formData.date,
      description: formData.description,
      banner: data.secure_url
    };
    try {
      const { data } = await api.post(
        "http://localhost:4000/api/admin/create-event",
        obj
      );
      if (data.success) {
        toast.success("Created successfully");
        setFormData({
          name: "",
          club: "",
          time: "",
          venue: "",
          date:"",
          description: "",
          banner: "mybanner",
        });
      } else {
        toast.error("Something went wrong!");
      }
      alert("Event created successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <h2>Create Event</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Event Name"
          onChange={handleChange}
          value={formData.name}
        />
        <Input
          name="club"
          placeholder="Club Name"
          onChange={handleChange}
          value={formData.club}
        />
        <Input
          name="time"
          placeholder="Time"
          onChange={handleChange}
          value={formData.time}
          type="time"
        />
        <Input
          name="venue"
          placeholder="Venue"
          onChange={handleChange}
          value={formData.venue}
        />
        <Input
          name="date"
          placeholder="Date"
          onChange={handleChange}
          value={formData.date}
          type="date"
        />
        <TextArea
          name="description"
          placeholder="Event Description"
          rows="4"
          onChange={handleChange}
          value={formData.description}
        />
        <FileInput type="file" onChange={handleFileChange} />
        {
          formData.banner == null ? (
            <Button disabled={true} type="submit">
              Create Event
            </Button>
          ) : (
            <Button disabled={isUploadingImage} type="submit">
              {isUploadingImage ? "Uploading..." : "Create Event"}
            </Button>
          )
        }
      </Form>
    </Container>
  );
};

export default CreateEventSection;
