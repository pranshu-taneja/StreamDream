import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({videoId}) => {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  const [currentComment, setcurrentComment] = useState("")

  const handleComment = async () => {
    try {
      console.log({Publishing_Content: videoId, currentUser, currentComment})
      const res = await axios.post("/comments", {
        videoId,
        userId: currentUser._id,
        desc: currentComment,
      });
      console.log("COmment published!!")
    } catch (err) { 
      alert("There was some error while posting the comment!!")
    }
  };


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY

  return (
    <Container>
      <NewComment>
        {currentUser.img ? <Avatar src={currentUser.img} /> : <AccountCircleIcon/>}
        <Input placeholder="Add a comment..." onChange={(e)=>setcurrentComment(e.target.value)}/>
        <button onClick={handleComment}>Comment</button>
      </NewComment>
      {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
      ))}
    </Container>
  );
};

export default Comments;
