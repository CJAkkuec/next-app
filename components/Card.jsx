import styled from "styled-components";

export const Card = ({ hp, name, image }) => {
  return (
    <>
      {" "}
      <StyledDiv>
        <StyledP>{name}</StyledP>
        <StyledP>HP: {hp}</StyledP>
        <img src={image} />
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  background: #eeebe8;
  border-radius: 10px;
  padding: 1rem;
  margin: 0.5rem;
`;

const StyledP = styled.p`
  text-transform: capitalize;
  text-align: center;
`;
