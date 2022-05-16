import React from "react";
import styled from "styled-components";
function DoctorProfile({ imageURL, name, type, timing, rating, id, onClick }) {
  return (
    <Container onClick={onClick}>
      <Image>
        <img src={imageURL} alt="" />
      </Image>
      <Info>
        <h4 className="doctor-name">{name}</h4>
        <p className="doctor-type">{type}</p>
        <div className="doctor-extra">
          <p className="doctor-rating">🌟 {rating}</p>
          <div className="doctor-timing">
            <p>🕛 {timing}</p>
          </div>
        </div>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  background: #ffffff;
  border-radius: 50px;
  width: 280px;
  height: 100px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 10px;
  @media only screen and (max-width: 618px) {
    margin-bottom: 20px;
    width: 100%;
  }
`;

const Image = styled.div`
  width: 50px;
  img {
    width: 100%;
  }
  margin-right: 15px;
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

export default DoctorProfile;
