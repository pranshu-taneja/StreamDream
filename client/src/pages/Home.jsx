import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100vh;
`;



const Home = ({type = "random"}) => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/videos/${type}`);
      setVideos(res.data);
      if(type === "sub" && !currentUser){
        alert("Please login to see your subscriptions");
        Navigate("/signin")
        return;
      }
      try {
        const res = await axios.get(`/api/videos/${type}`);
        setVideos(res.data);
      }
      catch {
        alert("Please Try again later!!")
      }
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  );
};

export default Home;
