import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DoctorProfile from "./DoctorProfile";
import Navbar from "./Navbar";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { useNavigate } from "react-router";
function Home() {
  const [allDoctors, setAllDoctors] = useState([]);
  const [currentTab, setCurrentTab] = useState("General");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      setAllDoctors(querySnapshot.docs);
    };

    fetchPosts();
  }, []);

  const goToDoctor = (id) => {
    if (id) {
      navigate(`/${id}`);
    }
  };

  const searchDoctor = allDoctors.filter((doctor) => {
    if (searchInput) {
      if (
        doctor.data().name.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return doctor;
      }
    }
  });

  const searchItem = searchDoctor.map((doctor) => {
    return (
      <DoctorProfile
        imageURL={doctor.data().imageURL}
        name={doctor.data().name}
        rating={doctor.data().rating}
        timing={doctor.data().timing}
        type={doctor.data().type}
        id={doctor.id}
        onClick={() => goToDoctor(doctor.id)}
      />
    );
  });

  return (
    <Container>
      <TopWave>
        <img src="./Vector.png" alt="" />
      </TopWave>
      <Navbar />
      <Main>
        <RightContainer>
          <div className="right-item">
            <div className="right-header">
              <p>Upcoming Scedule</p>
              <p>See More</p>
            </div>

            <div className="right-content">
              <p className="right-date">Web 30 9:00pm</p>
              <p className="right-doctor">Dentist</p>
              <div className="right-image">
                <img src="./Video Call.png" alt="" />
                <img src="./Call.png" alt="" />
              </div>
            </div>
            <div className="right-content">
              <p className="right-date">Web 30 9:00pm</p>
              <p className="right-doctor">Dentist</p>
              <div className="right-image">
                <img src="./Video Call.png" alt="" />
                <img src="./Call.png" alt="" />
              </div>
            </div>
          </div>
        </RightContainer>
        <LeftContainer>
          <div className="left-main">
            <div className="left-header">
              <h4>Let's Find Your Doctor</h4>
            </div>
            <div className="left-search">
              <input
                type="text"
                placeholder="Search doctor by name"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
            </div>
            <div className="left-tabs">
              <p onClick={() => setCurrentTab("General")}>General</p>
              <p onClick={() => setCurrentTab("Dentist")}>Dentist</p>
              <p onClick={() => setCurrentTab("Surgeon")}>Surgeon</p>
              <p onClick={() => setCurrentTab("Orthopadic")}>Orthopadic</p>
            </div>

            {searchInput.length > 0 ? (
              <div className="search-content">{searchItem}</div>
            ) : (
              <div className="left-contents">
                {allDoctors
                  .filter((doctor) => {
                    return currentTab === doctor.data().type;
                  })
                  .map((doctor) => (
                    <DoctorProfile
                      imageURL={doctor.data().imageURL}
                      name={doctor.data().name}
                      rating={doctor.data().rating}
                      timing={doctor.data().timing}
                      type={doctor.data().type}
                      id={doctor.id}
                      onClick={() => goToDoctor(doctor.id)}
                    />
                  ))}
              </div>
            )}
          </div>
        </LeftContainer>
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
  width: 90%;
  margin: auto;

  height: 500px;

  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const RightContainer = styled.div`
  width: 350px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  .right-item {
    width: 90%;

    .right-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        &:nth-child(1) {
          font-size: 16px;
          font-weight: 500;
        }

        &:nth-child(2) {
          color: #5ea5bb;
          font-size: 16px;
        }
      }
    }

    .right-content {
      width: 95%;
      margin: auto;

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

      .right-date {
        background-color: #fff;
        padding: 5px;
        font-size: 13px;
        width: 70px;
        line-height: 18px;
        border-radius: 10px;
      }

      .right-doctor {
        font-size: 15px;
      }

      .right-image {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 80px;
        img {
          width: 25px;
          cursor: pointer;
        }
      }
    }
  }

  @media only screen and (max-width: 1060px) {
    display: none;
  }
`;

const LeftContainer = styled.div`
  width: 700px;

  height: 500px;

  display: flex;
  align-items: center;
  justify-content: center;

  .left-main {
    width: 90%;
    margin: auto;

    height: 450px;
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 618px) {
      width: 100%;
    }
    .left-header {
      margin-top: 20px;

      h4 {
        font-size: 20px;
        font-weight: 500;
      }
    }

    .left-search {
      margin-top: 10px;
      width: 80%;
      height: 33px;
      @media only screen and (max-width: 618px) {
        width: 90%;
      }
      input {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        border: none;
        outline: none;
        padding-left: 10px;
      }
    }

    .left-tabs {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      padding-left: 10px;
      @media only screen and (max-width: 618px) {
        width: 90%;
      }
      p {
        font-size: 15px;
        padding: 5px;
        background: #fff;
        width: 80px;
        border-radius: 10px;
        cursor: pointer;
      }
    }
    .left-contents {
      margin-top: 20px;
      padding-left: 10px;
      display: grid;
      grid-template-rows: repeat(2, 120px);
      grid-template-columns: repeat(2, 290px);

      &::-webkit-scrollbar {
        display: none;
      }

      @media only screen and (max-width: 618px) {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        width: 80%;
        height: 250px;
      }
    }

    .search-content {
      overflow-y: scroll;
      margin-top: 20px;
      padding-left: 10px;
      height: 200px;
      display: grid;
      grid-template-rows: repeat(2, 120px);
      grid-template-columns: repeat(2, 290px);

      &::-webkit-scrollbar {
        display: none;
      }

      @media only screen and (max-width: 618px) {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        width: 80%;
        height: 250px;
      }
    }
  }
`;
export default Home;
