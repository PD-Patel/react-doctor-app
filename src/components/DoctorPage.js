import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "@firebase/firestore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { collection, addDoc } from "firebase/firestore";
import DialogTitle from "@mui/material/DialogTitle";
import db from "../firebase";
function DoctorPage() {
  const [doctorInfo, setDoctorInfo] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentDetail, setAppointmentDetail] = useState({
    patientName: "",
    appointmentDate: "",
    problem: "",
  });
  const { userID } = useParams();
  useEffect(() => {
    const fetchDoctor = async () => {
      const docRef = doc(db, "doctors", userID);

      const data = await getDoc(docRef);

      setDoctorInfo(data.data());
    };

    fetchDoctor();
  }, [userID]);

  const bookAppointment = (e) => {
    e.preventDefault();

    const docRef = addDoc(
      collection(
        db,
        "appointment",
        JSON.parse(localStorage.getItem("user")).email,
        "list"
      ),
      {
        ...appointmentDetail,
        doctorName: doctorInfo.name,
      }
    );

    alert("appointment created");
    setAppointmentDetail({
      patientName: "",
      appointmentDate: "",
      problem: "",
    });
    setOpenDialog(false);
  };
  return (
    <Container>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxSize={"md"}
        fullWidth
      >
        <DialogTitle>Book Appointment</DialogTitle>
        <DialogContent>
          <InputContainer>
            <p>Patient Name</p>
            <input
              type="text"
              onChange={(e) =>
                setAppointmentDetail({
                  ...appointmentDetail,
                  patientName: e.target.value,
                })
              }
              value={appointmentDetail.patientName}
            />
          </InputContainer>
          <InputContainer>
            <p>Date of Appointment</p>
            <input
              type="datetime-local"
              onChange={(e) =>
                setAppointmentDetail({
                  ...appointmentDetail,
                  appointmentDate: e.target.value,
                })
              }
              value={appointmentDetail.appointmentDate}
            />
          </InputContainer>
          <InputContainer>
            <p>Problem</p>
            <textarea
              onChange={(e) =>
                setAppointmentDetail({
                  ...appointmentDetail,
                  problem: e.target.value,
                })
              }
              value={appointmentDetail.problem}
            />
          </InputContainer>
        </DialogContent>
        <DialogActions>
          <CTAButton>
            <button
              className="cancel-button"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </button>
            <button className="create-button" onClick={bookAppointment}>
              Create
            </button>
          </CTAButton>
        </DialogActions>
      </Dialog>
      <TopWave>
        <img src="./Vector.png" alt="" />
      </TopWave>
      <Navbar />

      <Main>
        <ProfileImage>
          <img src={doctorInfo.imageURL} alt="" />
        </ProfileImage>

        <BookAppointment>
          <Info>
            <h4 className="doctor-name">{doctorInfo.name}</h4>
            <p className="doctor-type">{doctorInfo.type}</p>
            <div className="doctor-extra">
              <p className="doctor-rating">🌟 {doctorInfo.rating}</p>
              <div className="doctor-timing">
                <p>🕛 {doctorInfo.timing}</p>
              </div>
            </div>
          </Info>
          <button onClick={() => setOpenDialog(true)}>Book Appointment</button>
        </BookAppointment>

        <Description>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            asperiores modi fugit dolorum dolores! Magni totam, quos provident
            quasi pariatur dolores labore enim, porro tenetur tempore hic beatae
            veritatis architecto cumque ut! Itaque in consequatur minus suscipit
            cupiditate, animi harum consequuntur, assumenda quaerat dicta
            officiis, ipsum nisi eum maxime nulla.
          </p>
        </Description>
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

  .cancel-button {
    height: 33px;
  }
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
  width: 50%;

  margin: 30px auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: start;

  @media only screen and (max-width: 768px) {
    width: 85%;
  }
`;

const ProfileImage = styled.div`
  width: 100px;
  align-self: center;
  img {
    width: 100%;
    border-radius: 50%;
  }
`;

const BookAppointment = styled.div`
  width: 70%;
  margin: 20px auto;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  button {
    background-color: transparent;
    height: 45px;
    padding: 5px;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      background-color: #f7f7f7;
    }
  }
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  .doctor-name {
    margin-bottom: 5px;
    font-size: 16px;
  }

  .doctor-type {
    font-size: 12px;
    margin-bottom: 5px;
  }

  .doctor-extra {
    display: flex;
    font-size: 12px;
    width: 170px;
    align-items: center;
    justify-content: space-between;
  }
`;

const Description = styled.div`
  width: 50%;
  margin: 20px auto;
  text-align: left;

  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;

const InputContainer = styled.div`
  width: 90%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
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

  textarea {
    width: 95%;
    height: 150px;
    resize: none;
    padding: 5px;
    border: 1px solid lightgray;
    outline: none;
    border-radius: 5px;
  }
`;

const CTAButton = styled.div`
  .cancel-button {
    height: 40px;
    width: 80px;
    border: none;
    outline: none;
    margin-right: 10px;
    border-radius: 5px;
    background-color: red;
    color: #fff;
    cursor: pointer;
  }

  .create-button {
    cursor: pointer;
    height: 40px;
    width: 80px;
    border: none;
    outline: none;
    border-radius: 5px;
    color: #fff;
    background-color: #2121b6;
  }
`;

export default DoctorPage;
