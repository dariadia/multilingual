import { NextPage } from "next";

import { Layout } from "../components/Layout";
import useTranslation from "../intl/useTranslation";

const About: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout title={t("about")} className="about">
      <section className="page-content">
        <h1>{t("about")}</h1>
        <div className="page-text">
          {t("about_text")}
        </div>
      </section>
    </Layout>
  );
};

export default About;
