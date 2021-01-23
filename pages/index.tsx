import { NextPage } from "next";
import Link from "next/link";

import { Layout } from "../components/Layout";
import { useTranslation } from "../intl/useTranslation";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout title={t("home")} className="home">
      <section className="greeting">
        <div className="message">
          <p>{t("greeting")}</p>
          <Link href="/books">
            <a className="button">{t("books")}</a>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
