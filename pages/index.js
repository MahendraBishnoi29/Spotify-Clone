import Head from "next/head";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify</title>
      </Head>

      <Dashboard />
    </div>
  );
}
