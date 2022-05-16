import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import db, { auth } from "../firebase";
import { signOut } from "@firebase/auth";
function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const logout = (e) => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => alert(err));
  };
  return (
    <Container>
      <Menu openMenu={openMenu}>
        <p onClick={() => navigate("/appointments")}>Your Appointments</p>
        <p onClick={logout}>LogOut</p>
      </Menu>
      <HamBurger>
        <img src="./Menu.png" alt="" />
      </HamBurger>
      <Logo onClick={() => navigate("/")}>
        <h1>Doctor App</h1>
      </Logo>
      <Profile onClick={() => setOpenMenu(!openMenu)}>
        <img src="./Female Profile.png" alt="" srcset="" />
      </Profile>
    </Container>
  );
}

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Menu = styled.div`
  position: absolute;
  bottom: -70px;
  right: 0;
  display: ${(props) => (props.openMenu ? "block" : "none")};
  background-color: #fff;

  p {
    padding: 10px;
    cursor: pointer;
    font-size: 15px;
    &:hover {
      background-color: #f3f3f3;
    }
  }
`;

const HamBurger = styled.div`
  img {
    width: 40px;
  }
  cursor: pointer;
`;

const Logo = styled.div`
  width: 200px;
  margin-bottom: 10px;
  z-index: 1000;
  cursor: pointer;
  background-color: transparent;
  font-family: "Pattaya";
  letter-spacing: 3px;
  color: #444444;

  h1 {
    width: 100%;
    z-index: 1000;
    background: transparent;
  }
`;

const Profile = styled.div`
  img {
    width: 40px;
  }
  cursor: pointer;
`;

export default Navbar;
