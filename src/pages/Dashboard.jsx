import * as React from "react";
import { flex, modalStyle } from "../style/globalStyle";
import { Box, Grid, ImageListItem, Modal } from "@mui/material";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import BlogCard from "../components/blog/BlogCard";
import loadingGif from "../assets/loading.gif";
import clr from "../assets/clr.png";

export default function DashBoard() {
  const { getBlogsData } = useBlogCalls();
  const { blogs, loading } = useSelector((state) => state.blog);
  console.log(loading);

  
  useEffect(() => {
    getBlogsData("blogs");
  }, []);

  return (
    <>
      {loading ? (
        <ImageListItem
          href="/"
          sx={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            marginTop: 40,
            width: 400,
          }}
          
        >
          <img src={loadingGif} />
        </ImageListItem>
      ) : (
        <Grid container sx={flex} mt={10} spacing={5}>
          {blogs?.map((blog, index) => (
            <Grid item key={index}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
