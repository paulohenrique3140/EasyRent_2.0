import { Link } from "react-router";

function Home() {
  return (
    <main>
      <h1>EasyRent 2.0</h1>
      <p>Welcome to our vehicle rental management system!</p>

      <nav>
        <Link to="/clients">Client Management</Link>
        <br />
        <Link to="/vehicles">Vehicle Management</Link>
      </nav>
    </main>
  );
}

export default Home;