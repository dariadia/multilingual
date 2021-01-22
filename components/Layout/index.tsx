import React, { useContext } from "react";
import Head from "next/head";

import { Header } from "../Header";
import { Footer } from "../Footer";

interface Props {
  className?: string;
  children: React.ReactNode;
  desc?: string;
  title: string;
}

export const Layout: React.FC<Props> = ({
  className,
  children,
  title,
  desc,
}) => {
  const description = desc || "A Next.js multilingual site";
  const THUMBNAIL = "https://vanguardassets.bmstatic.com/assets/sharing/main.png?v4";

  return (
    <main className={className}>
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={THUMBNAIL} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={THUMBNAIL} />
      </Head>
      <Header />
      {children}
      <Footer>
        <p>dariadia ft. Bookmate proto - 2021</p>
      </Footer>
    </main>
  );
};
