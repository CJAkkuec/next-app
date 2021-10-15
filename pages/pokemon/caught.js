import Link from "next/link";

const Caught = () => {
  return (
    <div>
      <h1>Caught!</h1>
      <p>
        Zurück zur{" "}
        <Link href="http://localhost:3000/">
          <a>Startseite</a>
        </Link>
      </p>
    </div>
  );
};

export default Caught;
