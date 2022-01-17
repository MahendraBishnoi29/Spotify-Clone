import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";

export default function Home() {
  const router = useRouter();

  const { status, data: session } = useSession({
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <Head>
        <title>Spotify</title>
      </Head>

      <Dashboard />
    </div>
  );
}
