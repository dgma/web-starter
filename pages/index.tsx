import Head from "next/head";

import SocialIcons from "@/components/SocialIcons";
import MainBanner from "@/components/MainBanner";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Dogma Protocol</title>
        <meta name="description" content="Home for synthetics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full flex-col">
        <main className="flex-grow">
          <MainBanner />
        </main>
        <footer className="p-6">
          <SocialIcons />
        </footer>
      </div>
    </>
  );
}
