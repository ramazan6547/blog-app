import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { flexColumn, modalStyle } from "../../style/globalStyle";
import useBlogCalls from "../../hooks/useBlogCalls";
import { useSelector } from "react-redux";

const UpdateModal = ({ open, setOpen, info, setInfo }) => {
    const { getCategorisData, putBlogsData } = useBlogCalls();
  const { categories } = useSelector((state) => state.blog);
 
  const handleSubmit = (e) => {
    e.preventDefault();
  
    putBlogsData("blogs",info)

    setOpen(false);
    setInfo({});
  };

  
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleReset = () => {
    setInfo({
      title: "",
      content: "",
      image: "",
      category: "",
      status: "",
    });
  };
  useEffect(() => {
    getCategorisData("categories");
  }, []);
  return (
    <div>
      <Modal
       
        open={open}
        onClose={() => {
          setOpen(false);
          setInfo({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box component="form" sx={flexColumn} onSubmit={handleSubmit}>
            <Typography variant="h6" noWrap component="div">
              New Blog
            </Typography>
            <TextField
              label="Title"
              name="title"
              id="tile"
              type="text"
              variant="outlined"
              required
              
              value={info?.title || ""}
              onChange={handleChange}
            />
            <TextField
              label="Image URL"
              name="image"
              id="image"
              type="url"
              required
              variant="outlined"
              value={info?.image || ""}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                required
                labelId="category"
                id="category"
                name="category"
                value={info?.category}
                label="Category"
                onChange={handleChange}
              >
              
                {categories?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                required
                labelId="status"
                id="status"
                name="status"
                value={info?.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="d">Draft</MenuItem>
                <MenuItem value="p">Published</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Content"
              name="content"
              id="content"
              type="text"
              required
              variant="outlined"
              value={info?.content || ""}
              onChange={handleChange}
            />

            <Button onClick={handleReset} variant="contained" size="large">
              Reset Form
            </Button>
            <Button type="submit" variant="contained" size="large">
              Submit Form
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateModal;

