import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = {
          userName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        };

        localStorage.setItem("user", JSON.stringify(newUser));
        window.location.reload();
      })
      .catch((err) => alert(err));
  };
  return (
    <Container>
      <TopWave>
        <img src="./Vector.png" alt="" />
      </TopWave>
      <Logo>
        <h1>Doctor App</h1>
      </Logo>
      <Main>
        <FormContainer>
          <h3>Sign-In</h3>

          <InputContainer>
            <p>Email</p>
            <input
              type="email"
              placeholder="example@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </InputContainer>
          <InputContainer>
            <p>Password</p>
            <input
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </InputContainer>

          <LoginButton onClick={signIn}>Login</LoginButton>

          <InfoText>
            By continuing, you agree to Doctor's App &nbsp;
            <span>Conditions of Use </span>
            and <span> Privacy Notice</span>
          </InfoText>
          <SignUpButton onClick={() => navigate("/signup")}>
            Create Account in Amazon
          </SignUpButton>
        </FormContainer>
      </Main>
      <BottomWave>
        <img src="./Vector (1).png" alt="" />
      </BottomWave>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #fee7d3;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopWave = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -100;

  img {
    width: 100%;
  }
`;

const BottomWave = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: -100;
  img {
    width: 100%;
  }
`;

const Main = styled.div`
  height: 500px;
  background: transparent;
  width: 400px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  width: 200px;
  margin-bottom: 10px;
  z-index: 1000;
  top: 20px;
  background-color: transparent;
  font-family: "Pattaya";
  letter-spacing: 3px;
  color: #444444;
  position: absolute;

  h1 {
    width: 100%;
    z-index: 1000;
    background: transparent;
  }
`;

const FormContainer = styled.form`
  width: 70%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 33px;
    align-self: flex-start;
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  p {
    font-size: 14px;
    font-weight: 600;
    align-self: start;
    margin-bottom: 10px;
  }
  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;
    background-color: #fff;
    &:hover {
      border: 1px solid orange;
    }
  }
`;

const LoginButton = styled.button`
  width: 70%;
  height: 35px;
  background-color: #fff;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
`;

const InfoText = styled.p`
  font-size: 12px;
  width: 100%;
  word-wrap: normal;
  word-break: normal;
  margin-top: 20px;
  line-height: 22px;
  span {
    color: #426bc0;
  }
`;

const SignUpButton = styled.button`
  width: 55%;
  height: 35px;
  font-size: 12px;
  margin-top: 20px;
  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
  }
`;
export default Login;
