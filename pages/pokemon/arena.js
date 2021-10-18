import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { Card } from "../../components/Card";
import { useState } from "react";

import { tada } from "react-animations";

export default function Home({ details }) {
  const generateFighters = () => {
    setFighterA([details[Math.floor(Math.random() * details.length)]]);
    setFighterB([details[Math.floor(Math.random() * details.length)]]);
    setWinner();
  };

  const [fighterA, setFighterA] = useState([]);
  const [fighterB, setFighterB] = useState([]);
  const [winner, setWinner] = useState([]);

  const compareFighters = (fighterA, fighterB, fighterAName, fighterBName) => {
    if (fighterA > fighterB) {
      setWinner(<FightResult>{fighterAName} wins!</FightResult>);
    }
    if (fighterB > fighterA) {
      setWinner(<FightResult>{fighterBName} wins!</FightResult>);
    }
    if (fighterA === fighterB) {
      setWinner(<FightResult>Draw!</FightResult>);
    }
  };

  return (
    <MainDiv>
      <IntroDiv>
        <h1>BATTLE ARENA</h1>
      </IntroDiv>
      <StyledSection>
        <StyledButton1 onClick={() => generateFighters()}>
          Choose Your Fighters!
        </StyledButton1>
        <Arena>
          <StyledCard>
            {fighterA.map((pokemon) => {
              return (
                <Card
                  hp={pokemon.stats[0].base_stat}
                  name={pokemon.name}
                  image={pokemon.sprites.front_default}
                  key={pokemon.id}
                />
              );
            })}
          </StyledCard>
          <StyledCard>
            {fighterB.map((pokemon) => {
              return (
                <Card
                  hp={pokemon.stats[0].base_stat}
                  name={pokemon.name}
                  image={pokemon.sprites.front_default}
                  key={pokemon.id}
                />
              );
            })}
          </StyledCard>
        </Arena>
        <StyledButton2
          onClick={() =>
            compareFighters(
              fighterA[0].stats[0].base_stat,
              fighterB[0].stats[0].base_stat,
              fighterA[0].name,
              fighterB[0].name
            )
          }
        >
          Fight!
        </StyledButton2>
        <Tada>{winner}</Tada>
      </StyledSection>
      <IntroDiv>
        <p>
          {" "}
          Zurück zur{" "}
          <Link href="/">
            <a>Startseite</a>
          </Link>
        </p>
      </IntroDiv>
    </MainDiv>
  );
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const result = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await result.json();
  const allPokemonData = data.results;
  const details = await Promise.all(
    allPokemonData.map(async (pokemon) => {
      const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const data = await result.json();
      return data;
    })
  );
  // The value of the `props` key will be
  //  passed to the `Home` component
  console.log(details);
  return {
    props: {
      details,
    },
  };
}

const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`;

const MainDiv = styled.div`
  width: 50vw;
  margin: auto;
`;

const IntroDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton1 = styled.button`
  background: lightblue;
  border: none;
  border-radius: 10px;
  width: 100%;
  padding: 1rem;
`;

const StyledButton2 = styled.button`
  background: lightpink;
  border: none;
  border-radius: 10px;
  width: 100%;
  padding: 1rem;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Arena = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  border-radius: 30%;
  width: 500px;
  background: #eeebe8;
`;

const FightResult = styled.div`
  color: white;
  text-align: center;
  width: 100%;
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
  font-size: 1.5rem;
  background-color: lightgreen;
  &:first-letter {
    text-transform: capitalize;
  }
`;

const Tada = styled.div`
  animation: 2s ${keyframes`${tada}`} infinite;
`;
