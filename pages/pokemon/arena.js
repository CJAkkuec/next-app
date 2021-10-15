import Link from "next/link";
import styled from "styled-components";
import { Card } from "../../components/Card";
import { useState } from "react";

export default function Home({ details }) {
  const generateFighters = () => {
    setFighterA([details[Math.floor(Math.random() * details.length)]]);
    setFighterB([details[Math.floor(Math.random() * details.length)]]);
    setWinner("");
  };

  const [fighterA, setFighterA] = useState([]);
  const [fighterB, setFighterB] = useState([]);
  const [winner, setWinner] = useState([]);

  const compareFighters = (fighterA, fighterB) => {
    if (fighterA > fighterB) {
      setWinner("Fighter A wins!");
    }
    if (fighterB > fighterA) {
      setWinner("Fighter B wins!");
    }
    if (fighterA === fighterB) {
      setWinner("Draw!");
    }
  };

  return (
    <MainDiv>
      <IntroDiv>
        <h1>Fight!</h1>
        <p>
          {" "}
          Zurück zur{" "}
          <Link href="http://localhost:3000/">
            <a>Startseite</a>
          </Link>
        </p>
      </IntroDiv>
      <StyledSection>
        <StyledButton1 onClick={() => generateFighters()}>
          Choose Your Fighters!
        </StyledButton1>
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
        <StyledButton2
          onClick={() =>
            compareFighters(
              fighterA[0].stats[0].base_stat,
              fighterB[0].stats[0].base_stat
            )
          }
        >
          Fight!
        </StyledButton2>
        <div>
          <p>{winner}</p>
        </div>
      </StyledSection>
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

const StyledImage = styled.img`
  border-radius: 50%;
`;

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
  width: 50%;
  padding: 1rem;
`;

const StyledButton2 = styled.button`
  background: lightpink;
  border: none;
  border-radius: 10px;
  width: 50%;
  padding: 1rem;
`;

const StyledCard = styled.div`
  display: flex;
  flex: column;
`;
