import React from 'react'
import useAxios from "./useAxios";
import { useDispatch, useSelector } from "react-redux";
import { fetchStart,fetchFail,getSuccess,getSuccessDetails, getSuccessMyblogs } from '../features/blogSlice';
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useBlogCalls = () => {
  const { id:userId } = useSelector((state) => state.auth);

  const { axiosPublic, axiosWithToken } = useAxios();
  const dispatch = useDispatch();

  
  const getCategorisData = async (url) => {
    
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(`api/${url}/`);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  

  const getBlogsData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(`api/${url}/`);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  
  const getDetailsData = async (url, id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`api/${url}/${id}/`);
      console.log(data);
      dispatch(getSuccessDetails({ data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const getMyBlogsData = async (url, id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`api/${url}/?author=${id}`);
      dispatch(getSuccessMyblogs({ data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  

  const postBlogsData = async (url, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`api/${url}/`, info);
      getBlogsData(url);
    } catch (error) {
      console.log(error);
    }
  };

  

  const postBlogsLike = async (url, id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`api/${url}/${id}/`);
      toastSuccessNotify(`${url} successfuly added`);
      getBlogsData("blogs");
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be added`);
     
    }
  };
  //!!!!!!!!!!!!!!!!
  const postCreateComments = async (url, id, comment) => {
    // const BASE_URL = "https://12176.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      //  await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
      //   headers: { Authorization: `Token ${token}` },
      // });
      await axiosWithToken.post(`api/${url}/${id}/`, comment);
      toastSuccessNotify(`${url} successfuly added`);
      //? yeni veri eklendikten sonra veriyi tekrar get ederek datayı güncelliyoruz.
      // getBlogsData(url);
      getDetailsData("blogs", id);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be added`);
      // dispatch(fetchFail());
    }
  };


  const putBlogsData = async (url, info) => {
    try {
      await axiosWithToken.put(`api/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} successfuly added`);
      getDetailsData("blogs", info.id);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be added`);
    }
  };

  
  const deleteBlogsData = async (url, id) => {
    try {
      await axiosWithToken.delete(`api/${url}/${id}`);
      toastSuccessNotify(`${url} successfuly deleted`);
      getBlogsData(url);
      getMyBlogsData("blogs",userId)
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be deleted`);
    }
  };

  return {
    getBlogsData,
    postBlogsData,
    putBlogsData,
    deleteBlogsData,
    getCategorisData,
    getDetailsData,
    getSuccessDetails,
    getMyBlogsData,
    postBlogsLike,
    postCreateComments,
  };
}

export default useBlogCalls;