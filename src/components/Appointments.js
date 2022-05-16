import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import db from "../firebase";

import Navbar from "./Navbar";
function Appointments() {
  const [allAppointments, setAllAppointments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(
          db,
          "appointment",
          JSON.parse(localStorage.getItem("user")).email,
          "list"
        )
      );

      const querySnapshot = await getDocs(q);

      setAllAppointments(querySnapshot.docs);
    };
    fetchData();
  }, [allAppointments]);

  const cancelAppointment = async (e, appointmentID) => {
    e.preventDefault();

    await deleteDoc(
      doc(
        db,
        "appointment",
        JSON.parse(localStorage.getItem("user")).email,
        "list",
        appointmentID
      )
    );
  };

  return (
    <Container>
      <TopWave>
        <img src="./Vector.png" alt="" />
      </TopWave>
      <Navbar />
      <Main>
        <h3 className="appoint-header">Your Appointments</h3>
        <AppointmentsList>
          {allAppointments.map((appointment) => (
            <AppointData>
              <p className="appoint-date">
                {`Date:${appointment
                  .data()
                  .appointmentDate.slice(0, 10)} Time:${appointment
                  .data()
                  .appointmentDate.slice(11, 16)}`}
              </p>
              <p className="appoint-doctor">{appointment.data().doctorName}</p>

              <button onClick={(e) => cancelAppointment(e, appointment.id)}>
                Cancel Appointment
              </button>
            </AppointData>
          ))}
        </AppointmentsList>
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
  margin: auto;
  padding: 10px;
  height: 500px;

  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: start;

  justify-content: space-around;
  @media only screen and (max-width: 818px) {
    width: 90%;
  }
`;

const AppointmentsList = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;

  height: 100%;
`;
const AppointData = styled.div`
  width: 95%;
  margin: 10px auto;

  height: 90px;
  padding: 5px;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.149);
  border: 5.97px solid rgba(255, 255, 255, 0.298);
  backdrop-filter: blur(119.4px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  button {
    height: 40px;
    padding: 5px;
    background: transparent;
    border-radius: 5px;

    &:hover {
      background-color: #ececec;
    }
  }

  .appoint-date {
    background-color: #fff;
    padding: 5px;
    font-size: 13px;
    width: 120px;
    line-height: 18px;
    border-radius: 10px;
  }

  .appoint-doctor {
    font-size: 15px;
  }

  .appoint-image {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80px;
    img {
      width: 25px;
      cursor: pointer;
    }
  }
`;

export default Appointments;
