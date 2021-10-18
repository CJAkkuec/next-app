import Link from "next/link";
import styled from "styled-components";
import { Card } from "../components/Card";

export default function Home({ details }) {
  console.log(details);
  return (
    <MainDiv>
      <IntroDiv>
        <h1>Gotta catch them all!</h1>
        <h2>Pokemon-Master CJ</h2>
        <StyledImage src="/images/pic.png" height={228} width={241} alt="CJ" />
        <p>Wow. Many Pokemon. Much catch.</p>
        <p>
          {" "}
          Zu den{" "}
          <Link href="/pokemon/caught">
            <a>gefangenen Pokemon</a>
          </Link>
        </p>
        <p>
          {" "}
          In die{" "}
          <Link href="/pokemon/arena">
            <a>Arena ⚔️</a>
          </Link>
        </p>
      </IntroDiv>

      <StyledSection>
        {details.map((pokemon) => {
          return (
            <Card
              name={pokemon.name}
              image={pokemon.sprites.front_default}
              key={pokemon.id}
            />
          );
        })}
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
`;

const MainDiv = styled.div`
  max-width: 60%;
  margin: auto;
`;

const IntroDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
