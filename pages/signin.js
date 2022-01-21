import { getProviders, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../components/Loader";

function Signin({ providers }) {
  const { data: session } = useSession();

  const router = useRouter();

  //Session
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (session) return <Loader />;

  return (
    <div className="bg-black h-screen flex flex-col items-center pt-24 space-y-8">
      <Head>
        <title>LogIn - Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="https://rb.gy/y9mwtb"
        alt="Spotify Logo"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            onClick={() => signIn(provider.id)}
            className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
          >
            LogIn With {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
