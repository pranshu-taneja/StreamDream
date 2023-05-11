import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

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

const AddComment = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 5px 10px;
  cursor: pointer;
  text-align: center;
`;

const Comments = ({ videoId }) => {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  const [currentComment, setcurrentComment] = useState("")

  const handleComment = async () => {
    try {
      console.log({ Publishing_Content: videoId, currentUser, currentComment })
      await axios.post("/api/comments", {
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
        const res = await axios.get(`/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) { }
    };
    fetchComments();
  }, [videoId]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY

  return (
    <Container>
      {currentUser ?
        <div>
          <NewComment>
            <Avatar src={currentUser.img} />
            <Input placeholder="Add a comment..." onChange={(e) => setcurrentComment(e.target.value)} />
            <AddComment onClick={handleComment}>Comment</AddComment>
          </NewComment>
        </div>
        :
        <div></div>
      }

      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
