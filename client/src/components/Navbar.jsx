import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Upload from "./Upload";
import { logout } from "../redux/userSlice"
import streamdream from "../img/logo.png";


const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  color: white;
`;

const Img = styled.img`
  height: 25px;
`;

const Search = styled.div`
  width: 40%;
  position: relative;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  width: 40rem;
  color: ${({ theme }) => theme.text};

`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const handleLogout = async () => {
    dispatch(logout());
    console.log("Sucessfully Logged Out!!")
    navigate("/");
    window.location.reload();
  }
  return (
    <>
      <Container>
        <Wrapper>
          <Logo>
            <Img src={streamdream} />
            Stream-Dream
          </Logo>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} />
              {currentUser.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
          {currentUser ? (<Link onClick={() => { handleLogout() }} style={{ marginLeft: "1rem", fontWeight: "bold", textDecoration: "none" }}>Logout</Link>) : (null)}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
