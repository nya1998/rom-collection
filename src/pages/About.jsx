import { Helmet, HelmetProvider } from "react-helmet-async";

export default function About() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>ROM Collection | About</title>
        </Helmet>
      </HelmetProvider>
      <h1>About page</h1>
    </div>
  );
}
